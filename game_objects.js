//copyright jacky kuang

//no distribution otherwise you are inbreach of federal law
class Game_object {

    get_craftable_items = ( player, next_to_base=false, next_to_workbence=false, next_to_cauldron=false, next_to_drafter=false ) => {
        let possible_items = Object.assign({}, Game_state.craftable_items, next_to_base&&Game_state.craftable_items_base, next_to_workbence&&Game_state.craftable_items_bench, next_to_cauldron&&Game_state.craftable_items_cauldron, next_to_drafter&&Game_state.craftable_items_drafter)
        var craftable_items = []

        Object.keys( possible_items ).forEach( item_recipe_name => {
            let item_recipe = possible_items[item_recipe_name]              //{'stick': 2, 'leaf': 1}
            let material_names = Object.keys( item_recipe )                 // [stick, leaf]

            if ( Game_state.mortar_items.includes(item_recipe_name) && !player.items['mortar'] ) return

            if ( material_names.every( material_name => {
                if ( Game_state.not_materials.includes(material_name) ) return true

                let players_amount = player.items[material_name]??0
                let needed_amount = item_recipe[material_name]

                if ( needed_amount.constructor == Object ) {   // 'bottle': {'poison': 1}
                    if ( material_name == 'bottle' ) {
                        let liquid = Object.keys(needed_amount)[0]
                        let needed_amount_liquid = needed_amount[liquid]
                        let enough = player.check_liquid(liquid, needed_amount_liquid)
                        
                        return enough
                    } 
                }
        
                return players_amount >= needed_amount 
            } ) ) {
                craftable_items.push( item_recipe_name )
            }
        })

        return craftable_items
    }

    spread = (startx, starty, terrain, walls, rad_dist, push=true, walkable=[], only_walkable=false, fish=false) => {
        let game_map = game_state.environment 
        let start = [startx, starty]

        var open_nodes = []
        var closed_nodes = []

        open_nodes.push( new Node( start ) )

        while ( open_nodes.length ) {

            // sort
            open_nodes.sort( ( node_a, node_b ) => { return node_b.g - node_a.g} )

            // get node
            var current_node = open_nodes.pop()
            closed_nodes.push( current_node )

            var [x, y] = current_node.position
            
            if ( push ) game_state.environment[y][x].constructor==Array?game_state.environment[y][x].push(terrain):game_state.environment[y][x]=[game_state.environment[y][x], terrain]

            var neighbouring_nodes = [ [x-1, y], [x-1, y+1], [x, y+1], [x+1, y+1], [x+1, y], [x+1, y-1], [x, y-1], [x-1, y-1] ]

            neighbouring_nodes.forEach(node_position => {

                
                var [node_x, node_y] = node_position
                
                if ( !push && ( node_x == player_1.x && node_y == player_1.y || node_x == player_2.x && node_y == player_2.y ) ) return

                //not in map boundary
                if ( !( node_x >= 0 && node_x < game_map[0].length && node_y >= 0 && node_y < game_map.length ) ) return

                let map_terrain = game_map[node_y][node_x]

                //hit wall
                if ( !walls.length )
                    if ( map_terrain.constructor == Array ? map_terrain.some(t=>{return walls.includes(t['name']??t)}) : walls.includes(map_terrain['name']??map_terrain) ) return
                else {
                    let subterrain_not_walkable = !walkable.includes(map_terrain[0])
                    let has_water_not_walkabled = map_terrain.includes('water') && !walkable.includes('water')
                    let only_walkable_obstructables = only_walkable?walkable:Game_state.non_obstructing_terrain
                    let wall_open = t => {return t.name && t.open}

                    if ( !fish ) {
                        if ( map_terrain.constructor == Array ? 
                            subterrain_not_walkable || 
                            (has_water_not_walkabled) || 
                            !map_terrain.slice(1).every(t => {return only_walkable_obstructables.includes(t['name']??t) || wall_open(t) } ) 
                            : !walkable.includes(map_terrain['name']??map_terrain) )
                            return
                    }
                    else {
                        if ( !map_terrain.includes('water') || 
                        map_terrain.constructor == Array && !map_terrain.every(t => { return Game_state.non_obstructing_terrain.includes(t.name??t) } ) ) 
                        return
                    }
                }

                //node already in closed
                if ( closed_nodes.some( node => { return node.equal( node_position ) } ) ) return

                let neighbour_g = current_node.g + math.distance( node_position, current_node.position ) 
                let dist_from_node = Math.round( math.distance( node_position, [startx, starty] ) )

                if ( dist_from_node > rad_dist ) return

                //node in open with higher f
                if ( open_nodes.some( node => { 

                    if ( !node.equal( node_position ) ) return
                    if ( node.g > neighbour_g ) open_nodes.splice( open_nodes.indexOf( node ), 1 )
                    else return true

                } ) ) return

                let neighbour = new Node( node_position, current_node )
                neighbour.g = neighbour_g

                open_nodes.push( neighbour )
                
            })
        }

        if ( !push ) return closed_nodes
    }

    gas = (startx, starty) => {
        this.spread(startx, starty, 'gas', Game_state.obstructing_terrain.concat(['darkland']), Game_state.items_states['gasbomb']['max_spread_dist'])
    }

    rayshooting = (player, min_rad) => {
        var [start_x, start_y] = [player.x, player.y]
        var current_map_terrain = player.current_map_terrain
        var [enemy_x, enemy_y] = [player.enemy.x, player.enemy.y]
        var border = []
        var seeables = []

        for (let i=camera_x-camera_width/2; i<camera_x+camera_width/2;i++){border.push([i, camera_y-camera_height/2+1])}
        for (let i=camera_x-camera_width/2; i<camera_x+camera_width/2;i++){border.push([i, camera_y+camera_height/2])}
        for (let i=camera_y-camera_height/2+1; i<camera_y+camera_height/2;i++){border.push([camera_x-camera_width/2, i])}
        for (let i=camera_y-camera_height/2+1; i<camera_y+camera_height/2;i++){border.push([camera_x+camera_width/2-1, i])}
        
        border.forEach( pos=> {
            let [x, y] = pos
            let dy = y-start_y
            let dx = x-start_x
            let norm_mult = max(abs(dy), abs(dx))

            if ( norm_mult == 0 ) return
            
            dy = dy/norm_mult, dx = dx/norm_mult
            var closest
            var traversed = {'mountain1': false, 'mountain2': false, 'darkland': false, 'gas': false, 'smog':false}
            var level_to_terrain = {2: 'mountain1', 3: 'mountain2', 4: 'mountain2', 5: 'mountain2'}

            var seethroughdarkland = false

            
            for (let i=0;i<=norm_mult;i++) {
                let x = start_x + dx*i, y = start_y + dy*i
                let dist = math.distance([x, y], [start_x, start_y])
                x = round(x), y = round(y)
                
                let is_enemy = x == enemy_x && y == enemy_y
                let blocked = false                
                let terrain = game_state.environment[y][x]
                let terrain_level = Game_state.get_level(terrain)??1
 
                let has_pseudo_m1 = terrain.constructor == Array && terrain.some(t=>{return Game_state.pseudo_m1_blockers.includes(t.name??t) })
                let has_pseudo_m2 = terrain.constructor == Array && terrain.some(t=>{return Game_state.pseudo_m2_blockers.includes(t.name??t) })
                
                let CMI = t => {
                    if ( !current_map_terrain ) return false
                        
                    let CMT_contains_pseudo_m1 = current_map_terrain.constructor == Array && current_map_terrain.some(t=>{return Game_state.plus1_levelers.includes(t.name??t)})
                    let secondary_standin_map_terrain = CMT_contains_pseudo_m1 && (current_map_terrain.includes('mountain1') ? 'mountain2' : 'mountain1')

                    if ( t == 'mountain1' ) {
                        return current_map_terrain.includes(t) || secondary_standin_map_terrain == t
                    }
                    else if ( t == 'mountain2' ) {
                        return current_map_terrain.includes(t) || secondary_standin_map_terrain == t
                    } else
                    return current_map_terrain.includes(t)
                }
                
                if ( player.magic_sight.some(pos=>{return pos[0]==x && pos[1]==y}) ) {  //select unknown showing
                    is_enemy && seeables.push('enemy')
    
                } else {

                if ( !closest ) { 
                    is_enemy && seeables.push('enemy')

                    if ( ( terrain.constructor != Array ? !Game_state.obstructing_terrain.includes(terrain['name']??terrain) :        //sing env materials
                        terrain.every(t => {return !Game_state.obstructing_terrain.includes(t['name']??t) } ) && ( (terrain.includes('darkland')||terrain.includes('gas')||terrain.map(t=>{return t.name}).includes('smog')) ? seethroughdarkland || game_state.reaper_light(x, y) : true ) || dist<=min_rad )
                    ) {}
                    else {                        
                        ['mountain1', 'mountain2', 'darkland', 'gas', 'smog'].some(t=>{return terrain.map(t2=>{return t2.name??t2}).includes(t) && (traversed[t] = true, true)}), traversed['gas'] && (traversed['darkland'] = true), traversed['smog'] && (traversed['darkland'] = true)
                        if ( has_pseudo_m1 ) traversed[ level_to_terrain[terrain_level] ] = true
                        if ( has_pseudo_m2 ) traversed[ level_to_terrain[terrain_level+1] ] = true

                        closest = [terrain, x, y]; 
                    }
                }
                else {
                    let RT_blockers =  {'gas':[['m1', 'm1', 'm2'], ['m2', 'm2'], ['dl', 'm1', 'm2', 'beacon', 'campfire', 'reaper_light'], ['tr', 'm1', 'm2']],   //traversed m1 but not on m1 or m2
                                        'smog':[['m1', 'm1', 'm2'], ['m2', 'm2'], ['dl', 'm1', 'm2', 'beacon', 'campfire', 'reaper_light'], ['tr', 'm1', 'm2']],
                                        'mountain1':[['m2', 'm2'], ['dl', 'm1']], 
                                        'mountain2':[['dl', 'm1', 'm2']], 
                                        'darkland':[['m1', 'm1', 'm2'], ['m2', 'm2'], ['dl', 'm1', 'm2', 'beacon', 'campfire', 'reaper_light'], ['tr', 'm1', 'm2']], 
                                        'mysterypond':[['dl', 'm1', 'm2'], ['m1', 'm1', 'm2'], ['m2', 'm2'], ['tr', 'm1', 'm2']], 
                                        'dirt':[['dl', 'm1', 'm2'], ['m1', 'm1', 'm2'], ['m2', 'm2'], ['tr', 'm1', 'm2']]
                                        }

                    let level_to_RT_blockers = {1: RT_blockers['dirt'], 2: RT_blockers['mountain1'], 3: RT_blockers['mountain2']}
                    let dependencies

                        try{
                    
                    if ( has_pseudo_m1 || has_pseudo_m2 ) {
                        dependencies = has_pseudo_m1 ? level_to_RT_blockers[ terrain_level ] : has_pseudo_m2 ? level_to_RT_blockers[ terrain_level ] : []
                    } else dependencies = RT_blockers[ terrain[terrain.length-1].name ?? terrain[terrain.length-1] ] ?? RT_blockers[ terrain[0].name ?? terrain[0] ] ?? []
                        }catch{debugger}
                    
                    let N = ['stick', 'rock', 'leaf', 'mud', 'leafcover', 'water', 'dirt']
                    
                    let blk = groups => {return groups.some(group=>{
                        group = group.map(t=>{return t=='m1'?'mountain1':t=='m2'?'mountain2':t=='dl'?'darkland':t=='tr'?'tree':t})
                        let trav = group[0]
                        
                        return traversed[trav] && !group.slice(1).some(t => { return ['mountain1', 'mountain2', 'darkland'].includes(t) ? CMI(t) : t=='reaper_light' ? game_state.reaper_light(x, y) : terrain.map(t=>{return t.name??t}).includes(t) } )
                    })}
                    blk(dependencies) && (blocked = true)
                    
                    ;(terrain[terrain.length-1] == 'gas' || terrain[terrain.length-1] == 'smog') ? !seethroughdarkland && (traversed['darkland'] = true) : traversed[terrain[0]] = true
                    has_pseudo_m1 && level_to_terrain[terrain_level] && ( traversed[ level_to_terrain[terrain_level] ] = true )
                    has_pseudo_m2 && level_to_terrain[terrain_level + 1] && ( traversed[ level_to_terrain[terrain_level + 1] ] = true )

                    if ( !(has_pseudo_m1||has_pseudo_m2) && N.includes(terrain.constructor==Array?terrain[0]:terrain) && ( blk(RT_blockers['mountain1']) || blk(RT_blockers['mountain2']) || blk(RT_blockers['darkland']) ) ) blocked = true
                    !blocked && is_enemy && seeables.push('enemy')
                }

                }

                if ( !seeables.some( (pos, i)=> {
                    if ( pos[0]==x && pos[1] == y ) {
                        if ( pos[2] && !blocked ) seeables.splice(i, 1) && seeables.push([x, y, blocked, ...Object.keys(traversed)]);
                        return true
                    } 
                }) ) seeables.push([x, y, blocked, ...Object.keys(traversed)])
            }
        })
        
        return seeables
    }
    
    draw_in_round = () => {

        var player = game_state.turn
        let [player_x, player_y] = [player.x, player.y]
        let binocular_on = player.binocular_position.length != 0

        binocular_on && ([player.x, player.y] = player.binocular_position);
        
        player.mapped = false

        update_camera : {  //update camera coordinate with player location
            camera_x = math.min( math.max( player.x, camera_width/2 ), width-camera_width/2 )
            camera_y = math.min( math.max( player.y, camera_height/2 ), height-camera_height/2 ) - 1
        }
        
        var x_shift = block_width / 2
        var y_shift = block_height / 2
        var current_map_terrain = player.current_map_terrain
        var has_torch = player.items['torch']??false, has_lantern = player.items['lantern']??false
        let min_rad = has_lantern ? Game_state.items_states['lantern']['darkland_see_dist'] : has_torch ? Game_state.items_states['torch']['darkland_see_dist'] : 0
        var seeables = binocular_on ? this.rayshooting(player, 1) : this.rayshooting(player, min_rad)
        var m1_mult = Game_state.mountain1_see_mult
        var m2_mult = Game_state.mountain2_see_mult
        var tower_mult = Game_state.tower_see_mult
        var know_sel = false
        var images = Object.assign({}, Game_state.png_images)
        var dulling = ( game_state.day ? 1 : .17 + (has_torch&&.2) + (has_lantern&&.4) )
        var tint_colour = game_state.get_event_mult('tint') == 1 ? undefined : game_state.get_event_mult('tint')

        player.seeable_positions = []
        var seeable_objects = []
        
        player.generate_movement_area()

        var tint = (original, added) => {
            if ( !added ) return original
            
            let r = original[0] * .5 + added[0] * .5
            let g = original[1] * .5 + added[1] * .5
            let b = original[2] * .5 + added[2] * .5

            return [r, g, b]
        }

        var change_colour = original => {
            return math.multiply(tint(original, tint_colour), dulling)
        }
        
        background(...change_colour([200, 100, 0]))
        
        draw_environment : {     
            seeables.forEach( pos => {   //pos: 0:x   1:y   2:blocked   3:darkland   4:mountain1   5:mountain2
            // game_state.environment.forEach( ( y_array, index_y ) => {
            //     y_array.forEach( ( 一, index_x ) => {

                if ( pos=='enemy' ) return

                // var pos = [index_x, index_y]

                let [x, y] = [pos[0], pos[1]]
                // let [x, y] = [index_x, index_y]
                var map_terrain = game_state.environment[y][x]
                if (map_terrain.length==0)return
                let in_range = math.distance([x, y], [player.x, player.y])
                let [grid_x, grid_y] = camera_grid( x, y )


                map_terrain = map_terrain.constructor == Array ? map_terrain.slice() : map_terrain
                let map_terrain_last = map_terrain[map_terrain.length-1]
                    
                if ( pos[2] ) {     //draw 'x' where one can't see
                    image(images['cross'], grid_x*block_width, grid_y*block_height, block_width, block_height) 
                    return
                }

                //fix terrain 
                map_terrain.length == 1 && map_terrain[0] == 'dirt' && (map_terrain = 'dirt')
                map_terrain == 'water' && map_terrain.constructor == Array && (game_state.environment[y][x] = 'water')
                map_terrain.includes('gas') && map_terrain_last != 'gas' && (map_terrain.splice(map_terrain.indexOf('gas'), 1), map_terrain.push('gas'))

                var beacon_mult = Object.values(Game_state.items_states['beacon'])[1]
                var campfire_mult = Object.values(Game_state.items_states['campfire'])[1];

                if ( !game_state.day ) {
                    in_range *= 3
                    beacon_mult *= 4
                    campfire_mult *= 3
                    in_range /= 1 + (has_torch&&.4) + (has_lantern&&.8)  //see further with light
                }

                (current_map_terrain[0] == 'mountain1' || map_terrain[0] == 'mountain1') && (in_range /= m1_mult);
                (current_map_terrain[0] == 'mountain2' || map_terrain[0] == 'mountain2') && (in_range /= m2_mult);
                current_map_terrain.constructor == Array && current_map_terrain.some(t=>{return t.name == 'woodentower' || t.name == 'stonetower'}) && (in_range /=tower_mult);
                map_terrain_last['name'] == 'beacon' && map_terrain_last['power'] && (in_range /= beacon_mult)
                map_terrain_last['name'] == 'campfire' && (in_range /= campfire_mult)
                game_state.reaper_light(x, y) && (in_range /= Game_state.animals['reaper']['in_range_mult'])

                //day night changes

                let ispng = map_terrain.constructor == Array ? Game_state.png_items.includes(map_terrain_last.name??map_terrain_last) : Game_state.png_items.includes(map_terrain.name??map_terrain)

                // normal terrain
                if ( in_range < (binocular_on ? Game_state.items_states['binocular']['see_dist'] : player.see_dist) ) {       // on mountain or is mountain see further                        
                    let top_map_terrain;

                    if ( ispng && (map_terrain[0] == 'dirt' || map_terrain.constructor!=Array) ) { top_map_terrain = 'dirt' }

                    if ( map_terrain.constructor == Array ) {
                        if ( ispng && !map_terrain.includes('leafcover')) top_map_terrain = map_terrain.filter(t=>{return !Game_state.png_items.includes(t.name??t)}).slice(-1)[0]
                        else if ( map_terrain[0] == 'mysterypond' ) top_map_terrain = 'mysterypond'
                        else if ( map_terrain[0] == 'mountain1' || map_terrain[0] == 'mountain2' ) top_map_terrain = map_terrain[0]
                        else if ( map_terrain[0] == 'water' ) top_map_terrain = map_terrain[0]
                        else if ( map_terrain[0] == 'darkland' ) {
                            in_range > 2 ? (top_map_terrain = 'darkland') :
                            top_map_terrain = map_terrain_last
                        }
                        else if ( map_terrain.includes('gas') ) {
                            in_range > 2 ? (map_terrain = 'gas') :
                            top_map_terrain = map_terrain_last
                        }
                        else if ( map_terrain_last == 'quary' ) top_map_terrain = 'quary'
                        else if ( map_terrain[0] == 'hole' ) {
                            map_terrain.includes('leafcover') ? (top_map_terrain = 'dirt') :
                            top_map_terrain = 'hole'
                        }
                    }

                    let circle = false
                    let stair
                    ////////////////////////////////////////////////////////////////////////////////////////////////////////////
                    switch (top_map_terrain || map_terrain) {
                        case 'dirt' : {
                            fill(...change_colour([200, 100, 0]))
                            break
                        }
                        case 'stair' : {
                            stair = true
                            fill(...change_colour([30, 30, 30]))
                            break
                        }
                        case 'mountain1' : {
                            fill( ...change_colour([140, 190, 140]) )
                            break
                        }
                        case 'mountain2' : {
                            fill( ...change_colour([200, 220, 210]) )
                            break
                        }
                        case 'darkland' : {
                            fill( ...change_colour([50, 50, 70]) )
                            break
                        }
                        case 'gas' : {
                            fill( ...change_colour([100, 100, 60]) )
                            break
                        }
                        case 'mysterypond' : {
                            fill( ...change_colour([90, 0, 53]) )
                            break
                        }
                        case 'water' : {
                            fill( ...change_colour([50, 50, 255]) )
                            break
                        }
                        case 'quary' : {
                            fill( ...change_colour([0, 0, 0]) )
                            break
                        }
                        case 'hole' : {
                            fill( ...change_colour([50, 20, 0]))
                            circle = true
                            break
                        }
                    }
                    stroke(0, 0, 0)
                    strokeWeight(1)
                    !circle ? rect( grid_x*block_width, grid_y*block_height, block_width, block_height ) :
                    ellipse( grid_x*block_width + x_shift, grid_y*block_height + y_shift, block_width, block_height )  
                    stair && (fill(...change_colour([100, 100, 100])), (polygon(grid_x*block_width + x_shift, grid_y*block_height + y_shift, min(x_shift, y_shift), 4)))
                
                } else {
                    image(images['cross'], grid_x*block_width, grid_y*block_height, block_width, block_height) 
                    return
                }
                
                player.selection != undefined && typeof player.selection[0] == 'number' && player.selection[0] == x && player.selection[1] == y && (know_sel = true)

                if ( ispng ) {
                    let top_map_terrain = map_terrain.constructor == Array ? map_terrain[map_terrain.length-1] : map_terrain
                    let top = top_map_terrain['name']??top_map_terrain
                    let img
                    let hidden = top_map_terrain.name == 'shark' && top_map_terrain.submerged

                    if(x==68&&y==125) debugger
                    
                    images['grass'] = map_terrain.includes('mountain1') ? (game_state.day ? Game_state.png_images['grassmountain1'] : Game_state.png_images['grassm1night']) : (game_state.day ? Game_state.png_images['grass'] : Game_state.png_images['grass_night'])

                        
                    if ( map_terrain[1] && map_terrain[1]['exploded'] ) {
                        game_state.environment[y][x].splice(1, 1), map_terrain[0]=='dirt' && map_terrain.length == 1 && (game_state.environment[y][x] = 'dirt'), img = images['explosion']
                    }
                    else if ( top == 'phantom' ) {
                        top_map_terrain.morph && (img = images[top_map_terrain.morph])
                    }
                    else if ( top == 'fencegate' ) {
                        img = top_map_terrain.open ? images['fencegateopen'] : images['fencegateclosed']
                    }
                    else if ( !['base'].includes(top) ) {
                        img = images[top]
                    }

                    noStroke() 

                    if ( img == images['tree'] ) image(images['grass'], grid_x*block_width, grid_y*block_height, block_width, block_height)  //grass under tree
                    if ( map_terrain[0] == 'cementfoundation' && img != images['cementfoundation'] || map_terrain[0] == 'brickfoundation' && img != images['brickfoundation'] ) image(images[map_terrain[0]], grid_x*block_width, grid_y*block_height, block_width, block_height) //foundation under construction
                    if ( map_terrain.includes('grass') && img != images['grass'] && img != images['tree'] ) image(images['grass'], grid_x*block_width, grid_y*block_height, block_width, block_height)  //env item
                    if ( map_terrain.constructor == Array && map_terrain.map(t=>{return t.name}).includes('smog') && img != images['smog'] ) image(images['smog'], grid_x*block_width, grid_y*block_height, block_width, block_height)  //smog under

                    !hidden && img && image(img, grid_x*block_width, grid_y*block_height, block_width, block_height)

                    if ( Object.keys(Game_state.animals).includes(top) ) {
                        let animal = map_terrain.constructor == Array ? map_terrain[map_terrain.length-1] : map_terrain

                        animal.states['burning'] && animal.states['burning']['ticks'] && image(images['fire'], grid_x*block_width, grid_y*block_height, block_width, block_height)
                    }
                    else if ( top_map_terrain.burning && top_map_terrain.burning.ticks ) {
                        image(images['fire'], grid_x*block_width, grid_y*block_height, block_width, block_height)
                    }
                }
    
                //buldings and man made
                if ( map_terrain_last.constructor == Object ) {
                }
                
                draw_travel_area : {    //possible travel area
                    if ( !player.in_movement_area([pos[0], pos[1]]) || pos[2] ) break draw_travel_area
                    if ( player.has_state('stun') ) break draw_travel_area
                    
                    let [x, y] = camera_grid( pos[0], pos[1] )
                    let map_terrain = game_state.environment[pos[1]][pos[0]]
                    let current_terrain = game_state.environment[player.y][player.x]
                    
                    if ( map_terrain.includes('darkland') || current_terrain.includes('darkland') || map_terrain.includes('gas') || current_map_terrain.includes('gas') ) return

                    stroke('purple')
                    strokeWeight(3)
                    point(x*block_width+x_shift, y*block_height+y_shift)
                    strokeWeight(1)
                    stroke('black')
                }
                
                //alert terrain in change from other player
                if ( changed_positions.some( changed_pos=>{return changed_pos[0]==x && changed_pos[1]==y && changed_pos[2]!=player} ) && !map_terrain.includes('darkland') ) {      
                    fill(255, 255, 0)
                    ellipse( grid_x*block_width+x_shift, grid_y*block_height+y_shift, 10 )
                }

                player.seeable_positions.push([x, y])
                if ( map_terrain.constructor == Array && map_terrain.some(t=>{return typeof t=='object'}) ) {
                    map_terrain.forEach(t=>{t.constructor == Object && seeable_objects.push(t)})
                }
            }) 

        }
                        
        draw_player_sprites : { //player sprite
            let [ player_1x, player_1y ] = camera_grid( player_1.x, player_1.y)
            let [ player_2x, player_2y ] = camera_grid( player_2.x, player_2.y)
            let player_1_x_pixels = player_1x * block_width
            let player_1_y_pixels = player_1y * block_height
            let player_2_x_pixels = player_2x * block_width
            let player_2_y_pixels = player_2y * block_height

            let dist_p1p2 = math.distance([player_1.x, player_1.y], [player_2.x, player_2.y] )

            let I = terrains => {return Array(terrains).some(t=>{return player_1.current_map_terrain.includes(t)||player_2.current_map_terrain.includes(t)})}
            
            let p_in_range = dist_p1p2 < ( I('mountain2') ? player.see_dist*m2_mult : I('mountain1') ? player.see_dist*m1_mult : player.see_dist ) / (game_state.day?1:2)
            
            let p1_in_darkland = player_1.current_map_terrain.includes('darkland') && dist_p1p2 > 2
            let p2_in_darkland = player_2.current_map_terrain.includes('darkland') && dist_p1p2 > 2
            
            let player1_submerged = (player_1.current_map_terrain.includes('water') || player_1.current_map_terrain == 'water') && player_1.items['divinggear']
            let player2_submerged = (player_2.current_map_terrain.includes('water') || player_2.current_map_terrain == 'water') && player_2.items['divinggear']

            let p1_seeable = p_in_range && seeables.includes('enemy') && !player1_submerged && !p1_in_darkland && player_1.health > 0 
            let p2_seeable = p_in_range && seeables.includes('enemy') && !player2_submerged && !p2_in_darkland && player_2.health > 0
            
            let p1img = [player_1_x_pixels, player_1_y_pixels, block_width, block_height]
            let p2img = [player_2_x_pixels, player_2_y_pixels, block_width, block_height]

            let p2_camo = player_2.items['camosuit'] && images['camosuit']
            let p1_camo = player_1.items['camosuit'] && images['camosuit']

            player == player_1 ? ( p2_seeable && image(p2_camo ? p2_camo : images['virgin'], ...p2img), binocular_on ? image(images['eye'], ...p1img) : !player1_submerged && image(p1_camo?p1_camo:images['chad'], ...p1img) )
            : ( p1_seeable && image(p1_camo ? p1_camo : images['virgin'], ...p1img), binocular_on ? image(images['eye'], ...p1img) : !player2_submerged && image(p2_camo?p2_camo:images['chad'], ...p2img) );
        
            (p1_seeable || player == player_1) && player_1.player_states['burning']['ticks'] != undefined && image(images['fire'], ...p1img);
            (p2_seeable || player == player_2) && player_2.player_states['burning']['ticks'] != undefined && image(images['fire'], ...p2img);
        }

        draw_player_bases : {
            var del_bases = []

            player_1.bases.forEach( player_1_base => {
                let base_in_darkland = game_state.environment[player_1_base.y][player_1_base.x].includes('darkland')
                if ( !seeables.some( pos=>{return pos[0] == player_1_base.x && pos[1] == player_1_base.y && !pos[2] } ) ) return
                if ( player_1_base.health <=0 ) { del_bases.push(player_1_base); game_state.environment[player_1_base.y][player_1_base.x] = game_state.environment[player_1_base.y][player_1_base.x][0]; game_state.fix_terrain_dearray(player_1_base.x, player_1_base.y); return }
                
                let [base_x, base_y] = camera_grid( player_1_base.x, player_1_base.y )
                let base_x_pixel = base_x * block_width
                let base_y_pixel = base_y * block_height
                
                let [base_on_m1, base_on_m2] = [game_state.environment[player_1_base.y][player_1_base.x].includes('mountain1'), game_state.environment[player_1_base.y][player_1_base.x].includes('mountain2')]
                
                let dist_p1_to_base = math.distance( [player_1.x, player_1.y], [player_1_base.x, player_1_base.y] )
                let dist_p2_to_base = math.distance( [player_2.x, player_2.y], [player_1_base.x, player_1_base.y] )
                
                let p1_in_range = dist_p1_to_base < ( base_in_darkland ? 5 : (base_on_m1||player_1.current_map_terrain.includes('mountain1')) ? player_1.see_dist*m1_mult : (base_on_m2||player_1.current_map_terrain.includes('mountain2')) ? player_1.see_dist*m2_mult : player_1.see_dist ) / (game_state.day?1:2)
                let p2_in_range = dist_p2_to_base < ( base_in_darkland ? 5 : (base_on_m1||player_2.current_map_terrain.includes('mountain1')) ? player_2.see_dist*m1_mult : (base_on_m2||player_2.current_map_terrain.includes('mountain2')) ? player_2.see_dist*m2_mult : player_2.see_dist ) / (game_state.day?1:2)
                
                let img = [base_x_pixel+x_shift/5, base_y_pixel+y_shift/5, block_width-+x_shift/2.5 , block_height-y_shift/2.5]
                
                player == player_1 ? ( p1_in_range && image(images['base'], ...img) && player_1_base.base_states['burning']['ticks'] != undefined && fill(255, 0, 0) && image(images['fire'], ...img) )
                : ( p2_in_range && image(images['enemybase'], ...img) && player_1_base.base_states['burning']['ticks'] != undefined && fill(255, 0, 0) && image(images['fire'], ...img) )          
                
            })
            player_2.bases.forEach( player_2_base => {
                let base_in_darkland = game_state.environment[player_2_base.y][player_2_base.x].includes('darkland')
                if ( player_2_base.health <=0 ) { del_bases.push(player_2_base); game_state.environment[player_2_base.y][player_2_base.x] = game_state.environment[player_2_base.y][player_2_base.x][0]; game_state.fix_terrain_dearray(player_2_base.x, player_2_base.y); return }
                if ( !seeables.some( pos=>{return pos[0] == player_2_base.x && pos[1] == player_2_base.y && !pos[2] } ) ) return
                
                let [base_x, base_y] = camera_grid( player_2_base.x, player_2_base.y )
                let base_x_pixel = base_x * block_width
                let base_y_pixel = base_y * block_height
                
                let [base_on_m1, base_on_m2] = [game_state.environment[player_2_base.y][player_2_base.x].includes('mountain1'), game_state.environment[player_2_base.y][player_2_base.x].includes('mountain2')]
                
                let dist_p1_to_base = math.distance( [player_1.x, player_1.y], [player_2_base.x, player_2_base.y] )
                let dist_p2_to_base = math.distance( [player_2.x, player_2.y], [player_2_base.x, player_2_base.y] )
                
                let p1_in_range = dist_p1_to_base < ( base_in_darkland ? 5 : (base_on_m1||player_1.current_map_terrain.includes('mountain1')) ? player_1.see_dist*m1_mult : (base_on_m2||player_1.current_map_terrain.includes('mountain2')) ? player_1.see_dist*m2_mult : player_1.see_dist ) / (game_state.day?1:2)
                let p2_in_range = dist_p2_to_base < ( base_in_darkland ? 5 : (base_on_m1||player_2.current_map_terrain.includes('mountain1')) ? player_2.see_dist*m1_mult : (base_on_m2||player_2.current_map_terrain.includes('mountain2')) ? player_2.see_dist*m2_mult : player_2.see_dist ) / (game_state.day?1:2)

                let img = [base_x_pixel+x_shift/5, base_y_pixel+y_shift/5, block_width-+x_shift/2.5 , block_height-y_shift/2.5]
                
                player == player_1 ? ( p1_in_range && image(images['enemybase'], ...img) && player_2_base.base_states['burning']['ticks'] != undefined && fill(255, 0, 0) && image(images['fire'], ...img) )
                : ( p2_in_range && image(images['base'], ...img) && player_2_base.base_states['burning']['ticks'] != undefined && fill(255, 0, 0) && image(images['fire'], ...img) )          

            })

            for ( let base of del_bases ) {
                base.del_base()
            }
                    
        }


        draw_selection : {
            if (!player.selection || player.selection.constructor != Array ) break draw_selection
            
            let [x, y] = camera_grid(player.selection[0], player.selection[1])

            noFill()
            strokeWeight(4)
            stroke(255, 0, 0)
            rect(x*block_width, y*block_height, block_width, block_height)
            stroke(0, 0, 0)
            strokeWeight(1)
        }

        text_display : {
            fill(0, 255, 0)
            textSize(25);

            let turn_text = `P${player.name.slice(1)}'s turn`
            text(turn_text, ...wturn);

            let health_text = `Your health: ${ceil(player.health)}`
            text(health_text, ...whealth);

            let sel = player.selection && typeof player.selection[1] == 'number' && game_state.environment[player.selection[1]][player.selection[0]]

            if ( sel && sel[sel.length-1].name && sel[sel.length-1].health && !(sel[sel.length-1].parent && sel[sel.length-1].parent!=player) && seeable_objects.includes(sel[sel.length-1]) ) {
                let selection_health_text = `, ${sel[sel.length-1].name} health: ${round(sel[sel.length-1].health)}`

                text(selection_health_text, ...wselhealth);
            }

            let AcP_text = `Your action points: ${int(player.action_points)}`
            text(AcP_text, ...wacp);

            let hunger_text = `Your hunger: ${floor(player.hunger)}`
            text(hunger_text, ...whunger);
            
            selection : {
                let enemy;
                let self;
                player.selection && ( player.selection[0] == player.enemy.x && player.selection[1] == player.enemy.y && (enemy = true),
                player.selection[0] == player.x && player.selection[1] == player.y && (self = true) )

                let gs = player.selection && game_state.environment[player.selection[1]][player.selection[0]]

                gs && (
                    gs.constructor == Array && (gs = gs.map( item=>{return item['name']??item} ) ),
                    gs.includes('base') && (gs = gs.filter(a=>{return a != 'quary'})),
                    gs[gs.length-2] == 'poison' && (gs=gs.slice(0, gs.length-2 )+[, gs[gs.length-1]]),
                    gs[gs.length-1] == 'leafcover' && (gs = ( Game_state.landable_terrain.includes(gs[0]) ? [gs[0], 'leaf'] : 'leaf' ))
                )
                        
                let selection = (player.selection == undefined || typeof player.selection[0] != 'number') ? 'none' : gs
                let sel_text = `Selection: ${self ? 'self' : !know_sel ? '????' : enemy ? 'enemy' : player.selection == undefined ? 'none' : typeof player.selection[0] != 'number' ? 'none' : selection}`
                
                text(sel_text, ...wselection);
            }

            var [other_amount, materials_amount] = player.get_item()
            let Mat_no_text = `Materials: ${materials_amount}`
            let Oth_no_text = `Items: ${other_amount}`

            fill(255, 255, 255)

            if ( materials_amount == player.material_capacity ) fill(255, 0, 0)

            text(Mat_no_text, ...wmaterials)
            fill(255, 255, 255)

            if ( other_amount == player.crafted_item_capacity ) fill(255, 0, 0)

            text(Oth_no_text, ...witems)
            fill(0, 0, 0)
            
            UI_Button : {

                rect( b1[0], b1[1], b1[2], b1[3] )
                rect( b2[0], b2[1], b2[2], b2[3] )
                rect( b3[0], b3[1], b3[2], b3[3] )
                fill(255, 0, 0)
                text('USE', w1[0], w1[1])
                text('CRAFT', w2[0], w2[1])
                text('THROW', w3[0], w3[1])

                var drawn_message = false

                let drawmessage = () => {
                    textSize(30)
                    fill(0, 255, 0)
                    textWrap(WORD)
                    text(message, width_pixels+10, height_pixels-105, 400, 200)
                    message != '' && (drawn_message=true)
                    fill(255, 0, 0)
                }
                drawmessage()

                let sel = player.selection && typeof player.selection[0]=='number' && game_state.environment[player.selection[1]][player.selection[0]] 
                let storing_objects = Game_state.storing_objects
                let selection
                let dist_from_selection = player.selection && math.distance([player.selection[0], player.selection[1]], [player.x, player.y]) 

                if (sel && dist_from_selection < 2 && storing_objects.includes(sel[sel.length-1].name) && sel[sel.length-1].parent!=player.enemy && (selection = sel[sel.length-1].name, true) ) {
                    SE = true
                } else SE = false

                if ( SE ) {
                    fill(0, 0, 0) 
                    rect( b4[0], b4[1], b4[2], b4[3] )
                    rect( b5[0], b5[1], b5[2], b5[3] )
                    fill(255, 0, 0)
                    textSize(25)
                    text('STORE', w4[0], w4[1])
                    text('EXTRACT', w5[0], w5[1])
                }

                if ( clickpath.length == 0 ) break UI_Button

                let sel_box = (x) => {
                    let b = x==1?b1:x==2?b2:x==3?b3:x==4?b4:x==5&&b5  //button

                    noFill()
                    stroke(255, 255, 0)
                    strokeWeight(5)
                    rect(b[0], b[1], b[2], b[3])
                    strokeWeight(1)
                    stroke('black')
                }

                itemSelection=[] 

                if ( clickpath[clickpath.length-1] == 'use' ) { use_button : {       //////////////// energy values displayed
                    var items = Object.assign({}, player.items)
                    items = Object.fromEntries(Object.keys(items).map(key=>{return [key, items[key]]}).filter(a=>{return a!=false}))
                    items['fist'] = 1

                    if ( Object.values(items).length == 0 ) {
                        drawn_message==false && (message = 'No items to use')
                        drawmessage()
                        break UI_Button
                    }

                    layer = min(math.floor((Object.keys(items).length-1)/6), layer)
                    
                    for (let i in Object.keys(items)) {
                        let item_dur = player.item_durabilities[Object.keys(items)[i]]
                        let [name, no] = [Object.keys(items)[i], item_dur ? math.sum(item_dur) : Object.values(items)[i]]
                        let gsAcP = Game_state.items_states[name] && Game_state.items_states[name]['action_points']
                        let AcP = gsAcP ? player.use_action_points(gsAcP, 'use') : 0
                        let itemi = [width_pixels+20, w6[1]+math.mod(60*i, 60*6), name, round(AcP*10)/10, no, AcP<=player.action_points]
                        itemSelection.push(itemi)
                    }

                    textSize(35)
                    text("AcP", w8[0], w8[1])

                    sel_box(1)
                }}
                else if ( clickpath[clickpath.length-1] == 'craft' ) { craft_button : {
                    let next_to_base = player.dist_from_bases() <= 3 
                    let next_to_workbence = player.dist_from_workbenches() <= 3
                    let next_to_cauldron = player.dist_from_cauldrons() <= 3
                    let next_to_drafter = player.dist_from_drafters() <= 3
                    
                    let craftable_items = game_objects.get_craftable_items( player, next_to_base, next_to_workbence, next_to_cauldron, next_to_drafter )
                    var items = craftable_items
                    let required_AcP = next_to_workbence ? 2 : 5
                    required_AcP = player.use_action_points(required_AcP, 'craft')
                    let enoughAcP = player.action_points >= required_AcP

                    if ( craftable_items.length == 0 ) {
                        drawn_message==false && (message += 'No items to craft')
                        drawmessage()
                        break UI_Button
                    }

                    layer = min(math.floor((craftable_items.length-1)/6), layer)
                    let possible_items = Object.assign({}, Game_state.craftable_items, next_to_base&&Game_state.craftable_items_base, next_to_workbence&&Game_state.craftable_items_bench, next_to_cauldron&&Game_state.craftable_items_cauldron, next_to_drafter&&Game_state.craftable_items_drafter)

                    for (let item of craftable_items) {
                        let [name, AcP, no] = [item, required_AcP, min( Object.keys(possible_items[item]).map(mat=>{  
                            if ( Game_state.not_materials.includes(mat) ) return Infinity

                            let amount = possible_items[item][mat];       //'gasbomb': {'bottle': {'poison': 1}, 'torch': 1} -> {'poison': 1}, 1

                            if ( amount.constructor == Object ) {
                                if ( mat == 'bottle' ) {
                                    let [liquid, liquid_amount] = Object.entries(amount)[0]

                                    return floor(player.check_liquid(liquid, liquid_amount, false, true)/liquid_amount)
                                }
                            } else return floor(player.items[mat]/amount) }) ) ]

                        let add_no = possible_items[item]['add_amount']
                        add_no && (no=`${no}x${add_no}`)
                        let itemi = [width_pixels+20, w6[1]+math.mod(60*craftable_items.indexOf(item), 60*6), name, AcP, no, enoughAcP]
                        itemSelection.push(itemi)
                    }

                    textSize(35)
                    text("AcP", w8[0], w8[1])

                    sel_box(2)
                }}
                else if ( clickpath[clickpath.length-1] == 'throw' ) { throw_button : {
                    var items = player.items
                    items = Object.fromEntries(Object.keys(items).map(key=>{return items[key]!=0 && [key, items[key]]}).filter(a=>{return a!=false}))

                    if ( Object.values(items).length == 0 ) {
                        drawn_message==false && (message = 'No items to throw')
                        drawmessage()
                        break UI_Button
                    }
                    if ( !sel ) {
                        message = 'Reselect location on map'
                        drawmessage()
                        break UI_Button
                    }
                    
                    let [x, y] = player.selection
                    let dist = math.distance( [x, y], [player.x, player.y] )
                    let range_mult = player.current_map_terrain.includes('mountain1') ? Game_state.mountain1_range_mult : player.current_map_terrain.includes('mountain2') ? Game_state.mountain2_range_mult : 1

                    if ( dist > player.max_throw_dist * range_mult ) {message = 'Too far away'; drawmessage(); break UI_Button}

                    layer = min(math.floor((Object.keys(items).length-1)/6), layer)

                    for (let i in Object.keys(items)) {
                        let [name, AcP, no] = [Object.keys(items)[i], player.use_action_points(dist*Game_state.throwAC_mult, 'throw'), Object.values(items)[i]]
                        let itemi = [width_pixels+20, w6[1]+math.mod(60*i, 60*6), name, math.floor(AcP*10)/10, no, AcP<=player.action_points]
                        itemSelection.push(itemi)
                    }

                    textSize(35)
                    text("AcP", w8[0], w8[1])

                    sel_box(3)
                }}
                else if ( clickpath[clickpath.length-1] == 'store' ) { store_button : {
                    let possible_items = (selection == 'shelf'||selection == 'fridge') ? Game_state.foods.concat(Game_state.additional_shelf_items) : Game_state[selection + '_items'] ? Game_state[selection + '_items'] : Game_state.investible_items 
                    var items = Object.fromEntries(Object.entries(player.items).filter(([name, amount])=>{return possible_items.includes(name)&&amount>0}))

                    if ( Object.values(items).length == 0 ) {
                        drawn_message==false && (message = 'No items to store')
                        drawmessage()
                        break UI_Button
                    }

                    layer = min(math.floor((Object.keys(items).length-1)/6), layer)

                    for (let i in Object.keys(items)) {
                        let [name, no] = [Object.keys(items)[i], items[Object.keys(items)[i]]]
                        let itemi = [width_pixels+20, w6[1]+math.mod(60*i, 60*6), name, undefined, no, true]
                        itemSelection.push(itemi)
                    }

                    sel_box(4)
                }}
                else if ( clickpath[clickpath.length-1] == 'extract' ) { extract_button : {
                    let storing_object = sel[sel.length-1]
                    let correct_items = {}
                    var items = storing_object.name == 'base' ? Object.fromEntries(Object.entries(storing_object.items).filter(([_, no])=>no>0)) : storing_object.items.map(item=>{return item['name']}).forEach(item=>{correct_items[item]?correct_items[item]++:correct_items[item]=1})
                    items = Object.keys(correct_items).length!=0?correct_items:items

                    if ( !items || Object.values(items).length == 0 ) {
                        drawn_message==false && (message = 'No items stored')
                        drawmessage()
                        break UI_Button
                    }

                    layer = min(math.floor((Object.keys(items).length-1)/6), layer)

                    for (let i in Object.keys(items)) {
                        let [name, no] = [Object.keys(items)[i], floor(items[Object.keys(items)[i]])]
                        let itemi = [width_pixels+20, w6[1]+math.mod(60*i, 60*6), name, undefined, no, true]
                        itemSelection.push(itemi)
                    }

                    sel_box(5)
                }}

                fill(255, 0, 0)
                textSize(35)
                text("ITEM", w6[0], w6[1])  
                text("NO.", w7[0], w7[1])
                layer == 0 && fill(200, 200, 200)
                triangle(b6[0], b6[1]+b6[3], b6[0]+b6[2], b6[1]+b6[3], b6[0]+b6[2]/2, b6[1])
                fill(255, 0, 0)
                layer == math.floor((Object.keys(items).length-1)/6) && fill(200, 200, 200) 
                triangle(b7[0], b7[1], b7[0]+b7[2], b7[1], b7[0]+b7[2]/2, b7[1]+b7[3])
                text(layer+1, w9[0], w9[1])
                fill(0, 255, 0)
                
                textSize(25)

                itemSelection.slice(6*layer, 6*(layer+1)).forEach( item=>{  //itemselection = [x, y, name, acp, no, doable with current acp]
                    fill(255, 255, 255)
                    rect( item[0], item[1]+10, ['extract', 'store'].includes(clickpath[clickpath.length-1])?280:200, 50 )

                    item[5] ? fill(0, 0, 255) : fill(120, 120, 120)    //grey out if not enough acp
                    text(item[2], item[0]+5, item[1]+38)

                    if ( item[3] != undefined ) {
                        text(item[3], item[0]+230, item[1]+38)
                    }
                    if ( item[4] != undefined ) {
                        text(item[4], item[0]+315, item[1]+38)
                    }
                    fill(0, 0, 0)
                })          
                
            }

            PLAYER_Effects : {
                let current_effects = []
                Object.keys(player.player_effects).forEach( effect => { player.has_effect(effect) && current_effects.push(' ' + effect) })
                Object.keys(player.player_states).forEach( state => { player.player_states[state].constructor == Object && player.player_states[state]['ticks'] > 0 && current_effects.push(' ' + state)})
                let player_effect_text = `Current Player Effects:${current_effects.toString()}`

                fill(0, 255, 0)
                textSize(30);
                text(player_effect_text, w10[0], w10[1])
            }

            HELP_MENU : {
                if ( helpclicked ) {
                    let backtext = 'BACK'

                    text(backtext, b10[0], b10[1]+20)
                    textWrap(WORD)
                    textSize(40)
                    fill(255, 0, 255)
                    text('Help on ' + help_item + ':', 50, height_pixels + 80)
                    fill(255, 255, 255)
                    textSize(30)

                    let recipe = Game_state.all_items[help_item]['obtaining']

                    if ( !recipe ) {
                        recipe = []
                        Object.keys(Game_state.all_craftable_items).forEach(item_name => {
                            if ( item_name.split('_')[0] == help_item ) {
                                recipe.push(Game_state.all_craftable_items[item_name])
                            }
                        })
                    }

                    let helptext = `Method of Obtaining: ${JSON.stringify(recipe)}; Description: ${Game_state.all_items[help_item]['use']}`
                    
                    text(helptext, 50, height_pixels + 100, 1200)
                }
                else {
                    let help_text = 'Help Items:'

                    text(help_text, w11[0], w11[1])

                    fill(255, 0, 0)
                    triangle(b8[0], b8[1]+b8[3], b8[0]+b8[2], b8[1]+b8[3], b8[0]+b8[2]/2, b8[1])
                    triangle(b9[0], b9[1], b9[0]+b9[2], b9[1], b9[0]+b9[2]/2, b9[1]+b9[3])
                    
                    
                    let all_items = Object.keys(Game_state.all_items)

                    helpitemselection = []
                    helplayer = min(math.floor((Object.keys(all_items).length-1)/help_entries), helplayer)

                    for (let i in all_items) {
                        let itemi = [math.mod(help_width*i, help_width*help_entries)+20, height_pixels + 100, all_items[i]]
                        helpitemselection.push(itemi)
                    }

                    helpitemselection.slice(helplayer*help_entries, (helplayer+1)*help_entries).forEach( item => {
                        fill(255, 255, 255)
                        rect( item[0], item[1], 200, 50 )

                        let helptext = item[2]

                        fill(0, 0, 0)
                        text(helptext, item[0]+5, item[1]+35)
                    })
                }
            }

            Events : {
                if ( round_messages.length != 0 ) {
                    let eventtext = round_messages[0]

                    textSize(50)
                    fill(255, 0, 0)
                    text(eventtext, w12[0], w12[1])
                }
            }

        }

        ;[player.x, player.y] = [player_x, player_y]
    }



}