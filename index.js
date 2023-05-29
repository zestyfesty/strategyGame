const width = 100
const height = 100

var camera_x, camera_y;
const camera_width = 34, width_pixels = 1500
const camera_height = 26, height_pixels = 800

const block_width = width_pixels / camera_width, block_height = height_pixels / camera_height

const spawn_width = width//Math.round( width/10 )
const spawn_height = height

var player_1 
var player_2

var changed_positions = []

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var clickpath = []

const b1 = [width_pixels + 10, 120+10+25, 125, 30]
const b2 = [width_pixels + 142.5, 120+10+25, 125, 30]      //use craft throw buttons
const b3 = [width_pixels + 274.5, 120+10+25, 120, 30]
var SE = false                                        //toggle storing and extracting buttons
const b4 = [width_pixels + 10, 155+10+25, 125, 30]
const b5 = [width_pixels + 142.5, 155+10+25, 125, 30]

const b6 = [width_pixels + 20, 600+25, 30, 30]     // down and up button
const b7 = [width_pixels + 20, 635+25, 30, 30]

const b8 = [width_pixels - 40, height_pixels + 60, 40, 40]
const b9 = [width_pixels - 40, height_pixels + 105, 40, 40]
const b10 = [width_pixels - 100, height_pixels + 120, 100, 50]

var itemSelection = []
var layer = 0

var helpitemselection = []
var helplayer = 0
var helpclicked = false
var help_item
const help_entries = 5
const help_width = 250

const wturn = [width_pixels + 10, 23]
const whealth = [width_pixels + 10, 48]
const wselhealth = [width_pixels + 190, 48]
const wacp = [width_pixels + 10, 70]
const whunger = [width_pixels + 10, 70+25]
const wselection = [width_pixels + 10, 95+25]
const wmaterials = [width_pixels + 10, 120+25]
const witems = [width_pixels + 10 + 270, 120+25]

const w1 = [width_pixels + 46, 143+10+25]
const w2 = [width_pixels + 46+120, 143+10+25]
const w3 = [width_pixels + 46+240, 143+10+25]
const w4 = [width_pixels + 30, 180+10+25]
const w5 = [width_pixels + 46+100, 180+10+25]

const w6 = [width_pixels + 20, 235+25]
const w7 = [width_pixels + 325, 235+25]
const w8 = [width_pixels + 230, 235+25]

const w9 = [width_pixels + 70, 645+25]

const w10 = [10, height_pixels+30]

const w11 = [10, height_pixels+70]

const w12 = [width_pixels/2 - 100, 50] //gs event


var message = ''
var round_messages = []

const date = new Date()
const end_use_date = new Date(2023, 7, 0, 0, 0, 0)

var won = false

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function setup() {
    createCanvas( width_pixels+500, height_pixels+200 );

    ////////////////////////////////////////////////////////////////////////////
    
    game_state = new Game_state( width, height )
    game_objects = new Game_object()

    Game_state.foods = []
    Object.entries(Game_state.items_states).forEach(([name, values])=>{
        values['type'] == 'food' && Game_state.foods.push(name)
    })
    Object.keys(Game_state.animals).forEach(animalname => {Game_state.non_obstructing_terrain.push(animalname)}) 
    Game_state.png_images = {
        'base': loadImage('sprites/base.png'),
        'enemybase': loadImage('sprites/enemybase.png'),
        'rock': loadImage('sprites/rock.png'),
        'leaf': loadImage('sprites/leaf.png'),
        'stick': loadImage('sprites/stick.png'),
        'campfire': loadImage('sprites/campfire.png'),
        'workbench': loadImage('sprites/workbench.png'),
        'smelter': loadImage('sprites/smelter.png'),
        'spike': loadImage('sprites/spike.png'),
        'bomb': loadImage('sprites/bomb.png'),
        'landmine': loadImage('sprites/landmine.png'),
        'explosion': loadImage('sprites/explosion.png'),
        'fire': loadImage('sprites/fire.png'),
        'nettrap': loadImage('sprites/nettrap.png'),
        'plank': loadImage('sprites/plank.png'),
        'beacon': loadImage('sprites/beacon.png'),
        'chad': loadImage('sprites/chad.png'),
        'virgin': loadImage('sprites/virgin.png'),
        'cow': loadImage('sprites/cow.png'),
        'goat': loadImage('sprites/goat.png'),
        'lion': loadImage('sprites/lion.png'),
        'bridge': loadImage('sprites/bridge.png'),
        'tree': loadImage('sprites/tree.png'),
        'grass_night': loadImage('sprites/grass.png'),
        'grassm1night': loadImage('sprites/grassm1.png'),
        'grass': loadImage('sprites/grass.png'),
        'grassmountain1': loadImage('sprites/grassm1.png'),
        'cross': loadImage('sprites/cross.png'),
        'chest': loadImage('sprites/chest.png'),
        'garden': loadImage('sprites/garden.png'),
        'meat': loadImage('sprites/meat.png'), 
        'leafcover': loadImage('sprites/leaf.png'),
        'ravenger': loadImage('sprites/monster_a.png'),
        'knave': loadImage('sprites/monster_g.png'),
        'shrieker': loadImage('sprites/monster_d.png'),
        'tulip': loadImage('sprites/flower_a.png'),
        'mushroom': loadImage('sprites/mushroom.png'),
        'cauldron': loadImage('sprites/cauldron.png'),
        'shelf': loadImage('sprites/shelf.png'),
        'scarecrow': loadImage('sprites/scarecrow.png'),
        'doctor': loadImage('sprites/monster_h.png'),
        'smog': loadImage('sprites/smog.png'),
        'fish': loadImage('sprites/fish_a.png'),
        'sapling': loadImage('sprites/sapling.png'),
        'forestspirit': loadImage('sprites/monster_i.png'),
        'fridge': loadImage('sprites/fridge.png'),
        'reveller': loadImage('sprites/monster_j.png'),
        'shark': loadImage('sprites/shark.png'),
        'mussel': loadImage('sprites/mussel.png'),
        'cattail': loadImage('sprites/cattail.png'),
        'lilypad': loadImage('sprites/lilypad.png'),
        'coral1': loadImage('sprites/coral_a.png'),
        'coral2': loadImage('sprites/coral_b.png'),
        'shell': loadImage('sprites/shell.png'),
        'edentree': loadImage('sprites/eden_tree.png'),
        'orevein': loadImage('sprites/ore.png'),
        'enbalmer': loadImage('sprites/monster_f.png'),
        'reaper': loadImage('sprites/monster_k.png'),
        'ice': loadImage('sprites/ice.png'),
        'twinenet': loadImage('sprites/twinenet.png'),
        'bait': loadImage('sprites/baitsmall.png'),
        'largebait': loadImage('sprites/bait.png'),
        'fence': loadImage('sprites/fence.png'),
        'babycow': loadImage('sprites/babycow.png'),
        'babygoat': loadImage('sprites/babygoat.png'),
        'scaffold': loadImage('sprites/scaffold.png'),
        'sand': loadImage('sprites/sand.png'),
        'cementwall': loadImage('sprites/cementwall.png'),
        'wetcementwall': loadImage('sprites/wetcementwall.png'),
        'woodenwall': loadImage('sprites/woodenwall.png'),
        'rockwall': loadImage('sprites/rockwall.png'),
        'brickwall': loadImage('sprites/brickwall.png'),
        'gate': loadImage('sprites/gate.png'),
        'fencegate': loadImage('sprites/fencegateopen.png'),
        'fencegateopen': loadImage('sprites/fencegateopen.png'),
        'fencegateclosed': loadImage('sprites/fencegateclosed.png'),
        'drafter': loadImage('sprites/drafter.png'),
        'berserker': loadImage('sprites/monster_l.png'),
        'bewitched': loadImage('sprites/monster_m.png'),
        'cinder': loadImage('sprites/monster_e.png'),
        'phantom': loadImage('sprites/monster_b.png'),
        'crimsonroot': loadImage('sprites/crimsonroot.png'),
        'woodentower': loadImage('sprites/woodentower.png'),
        'stonetower': loadImage('sprites/stonetower.png'),
        'brickfoundation': loadImage('sprites/brickfoundation.png'),
        'cementfoundation': loadImage('sprites/cementfoundation.png'),
        'greenhouse': loadImage('sprites/greenhouse.png'),
        'lumbermill': loadImage('sprites/lumbermill.png'),
        'window': loadImage('sprites/window.png'),
        'composter': loadImage('sprites/composter.png'),
        'manuer': loadImage('sprites/manuer.png'),
        'charcoal': loadImage('sprites/charcoal.png'),
        'ape': loadImage('sprites/ape.png'),
        'babyape': loadImage('sprites/babyape.png'),
        'mud': loadImage('sprites/mud.png'),
        'dam': loadImage('sprites/dam.png'),
        'mudpath': loadImage('sprites/dam.png'),
        'stonepath': loadImage('sprites/dam.png'),
        'ironwall': loadImage('sprites/ironwall.png'),
        'eye': loadImage('sprites/eye.png'),
        'condenser': loadImage('sprites/condenser.png'),
        'bandit': loadImage('sprites/bandit.png'),
        'hammock': loadImage('sprites/hammock.png'),
        'camosuit': loadImage('sprites/camosuit.png'),
        'carcasscollector': loadImage('sprites/carcasscollector.png'),
        'trophy': loadImage('sprites/trophy.png'),
        'treepot': loadImage('sprites/treepot.png'),
        'babyfish': loadImage('sprites/babyfish.png'),
        'fishfeeder': loadImage('sprites/fishfeeder.png'),
        'wood': loadImage('sprites/wood.png'),
        'chickweed': loadImage('sprites/chickweed.png'),
        'dandelion': loadImage('sprites/dandelion.png'),
        'wheat': loadImage('sprites/wheat.png'),
        'banana': loadImage('sprites/banana.png'),
        'carrot': loadImage('sprites/carrot.png'),
        'angrybird': loadImage('sprites/monster_p.png'),
        'hairyboi': loadImage('sprites/monster_o.png'),
        'deceiver': loadImage('sprites/monster_n.png'),
        'shrill': loadImage('sprites/monster_aa.png'),
        'charred': loadImage('sprites/monster_ab.png'),
        'abadee': loadImage('sprites/monster_ac.png'),

        }
        
        
        
    Game_state.png_items = Object.keys(Game_state.png_images)
    
    initiate_round()
    date < end_use_date ?
    setTimeout(main, 2000) : console.log('use date expired')
    
    
}

function clickedButton( x, y, buttons ) {
    for (let i = 0; i < buttons.length; i+=1) {
        if ( buttons[i][0] < x && buttons[i][0] + buttons[i][2] > x && buttons[i][1] < y && buttons[i][1] + buttons[i][3] > y ) return i
    }
    return -1   
}

function mouseClicked( _ ) {
    if ( won ) return

    let ptd = pixel_to_grid( mouseX, mouseY )
    var [ x_grid, y_grid ] = ptd
    let ingamearea = 0 < mouseX && mouseX < width_pixels-1 && 0 < mouseY && mouseY < height_pixels-1
    let player = game_state.turn
    let seldefined = player.selection && typeof player.selection[0] == 'number'

    message = ''

    if ( ingamearea ) { 
        seldefined && player.selection[0] == x_grid && player.selection[1] == y_grid ? player.move() :  //click twice
        (player.player_states['drunk']['ticks']) ? player.drunk_selection() : player.selection = [x_grid, y_grid];

        (clickpath[0]=='store' || clickpath[0]=='extract') && (clickpath=[])
    }
    else {
        let scroll = clickedButton(mouseX, mouseY, [b6, b7])
        layer += scroll != -1 ? scroll*2-1 : 0
        layer = max(0, layer)

        let path1 = ['use', 'craft', 'throw'][clickedButton(mouseX, mouseY, [b1, b2, b3])]
        let path1SE
        SE && (path1SE = ['store', 'extract'][clickedButton(mouseX, mouseY, [b4, b5])]);

        path1 && (clickpath = [path1]), path1SE && (clickpath = [path1SE])

        let displaying = itemSelection.slice(6*layer, 6*(layer+1))  //[x, y, name, acp, no, doable with current acp]
        let ind = clickedButton(mouseX, mouseY, displaying.map(itemvars=>{return [itemvars[0], itemvars[1], 200, 50]}))  //x, y, width, height
        let item = displaying.map(itemvars=>{return itemvars[2]})[ind]
        let can = displaying.map(itemvars=>{return itemvars[5]})[ind]
        let sel = seldefined && game_state.environment[player.selection[1]][player.selection[0]]
        sel = sel && sel[sel.length-1]

        let helpscroll = clickedButton(mouseX, mouseY, [b8, b9])
        helplayer += helpscroll != -1 ? helpscroll*2-1 : 0
        helplayer = max(0, helplayer)

        let helpdisplaying = helpitemselection.slice(help_entries*helplayer, help_entries*(helplayer+1))   //columns * x
        let helpind = clickedButton(mouseX, mouseY, helpdisplaying.map(helpitemvars=>{return [helpitemvars[0], helpitemvars[1], 200, 50]}))  //x, y, width, height
        let helpitem = helpdisplaying.map(helpitemvars=>{return helpitemvars[2]})[helpind]


        if (can) 

        switch (clickpath.length) {
            
            case 1 : {
                if ( clickpath[0] == 'use' ) {                    
                    item && player.use(item)
                }
                else if ( clickpath[0] == 'craft' ) {
                    item && player.craft(item)
                }
                else if ( clickpath[0] == 'throw' ) {
                    item && player.place(item)
                }
                else if ( clickpath[0] == 'store' ) {
                    let base = player.bases.filter(base=>base.x == player.selection[0] && base.y == player.selection[1])[0]
                    item && (sel['name'] == 'base' ? base.store(item, 1) : sel.items.length < Game_state.items_states[sel.name]['storage_capacity'] ? player.place_in_object(item, sel) : message = 'max capacity reached')
                }
                else {
                    let base = player.bases.filter(base=>base.x == player.selection[0] && base.y == player.selection[1])[0]
                    item && (sel['name'] == 'base' ? base.extract(item, 1) : player.take(item, sel))
                }
                break
            }
            case 2 : {

                break
            }
        }

        if ( helpitem && !helpclicked ) {
            helpclicked = true
            help_item = helpitem
        }
        else if ( helpclicked ) {
            clickedButton(mouseX, mouseY, [b10]) != -1 && (helpclicked = false, help_item = undefined)
        }

    }

    game_objects.draw_in_round()
}

function keyPressed() {
    if ( won ) return

    active_player = game_state.turn

    switch (keyCode) {
        case ENTER: { 
            game_state.next_turn()
            break
        }
        case 70 : {
            active_player.collect_material()
            game_objects.draw_in_round()
            break
        }
        case 77 : {         //hacked move
            active_player.x = active_player.selection[0]
            active_player.y = active_player.selection[1]
            active_player.current_map_terrain = game_state.environment[active_player.y][active_player.x]
            game_objects.draw_in_round()
            break
        }
        case 80: {
            debugger
            break
        }
        case 75: {
            clearInterval(window.animal_move_interval)
            terrain = game_state.environment[active_player.selection[1]][active_player.selection[0]]
            terrain.constructor == Array && terrain.filter(t=>{return Object.keys(Game_state.animals).includes(t.name)}).forEach(animal=>{game_state.kill_animal(animal)}) 
            window.animal_move_interval = window.setInterval(game_state.move_animals, Game_state.move_animal_interval)
            break
        }
        case 72: {
            active_player.health = 100
            active_player.action_points = 100
            active_player.hunger = 100
            break
        }
        case 69: {
            let [x, y] = [active_player.selection[0], active_player.selection[1]]
            active_player.evaluate_selection()
            message = JSON.stringify(active_player.selection.constructor == Array ? active_player.selection.map(t=>{return t.name??t}):active_player.selection)
            active_player.selection = [x, y]
            game_state.fix_terrain_dearray(x, y)
            game_objects.draw_in_round()
            break
        }
        case 68: {
            let [x, y] = [active_player.selection[0], active_player.selection[1]]
            game_state.environment[y][x].pop()
            game_state.fix_terrain_dearray(x,y)
            break
        }

    }


}


main = () => {
    var active_player = game_state.turn

    //invest items in quary bases  ///////////////////////////////////////////////////////////////////////////////////////
    player_1.bases.concat(player_2.bases).forEach(base => {
        base.type == 'quary' && base.invest()
    });

    
    //update item states   ///////////////////////////////////////////////////////////////////////////////////////
    var update = (states, item, player) => {
        for (let i=states[item].length-1; states[item][i]!=undefined; i --) {  //{item: [torch1, torch2...]}
            states[item][i]['round'] != undefined && states[item][i]['round'] ++

            if ( states[item][i]['perishing'] ) {
                var rounds = Game_state.items_states[item]['perishing_rounds']

                states[item][i]['round'] >= rounds && player.subtract_item(item, 1)
            }

            switch (item) {
                case 'torch' : {
                    if ( states[item][i]['round'] > 2 ) {
                        states[item].shift()
                        player.subtract_item(item, 1)
                    }
                    break
                }
                case 'fireball' : {
                    if ( states[item][i]['round'] > 1 ) {
                        states[item].shift()
                        player.subtract_item(item, 1)
                        player.player_states['burning']['ticks'] = 0
                    }
                    break
                }
                case 'bomb' : {
                    if ( states[item][i]['round'] > 0 && !states[item][i]['ticks'] ) {   //start ticking when placed on ground after 1 round
                        states[item][i]['ticks'] = 0
                    }
                    break
                }
            }
        }
    }
    var states = player_1.items_states
    Object.keys( states ).forEach( item => {
        update(states, item, player_1)
    })
    var states = player_2.items_states
    Object.keys( states ).forEach( item => {
        update(states, item, player_2)
    })


    // update player states  ///////////////////////////////////////////////////////////////////////////////////////
    var update_player_state = (states, state, player) => {
        switch (state) {
            case 'action_point_gain' : {
                states[state].forEach( acchange_values => {
                    if ( acchange_values[0]==undefined ) return

                    let AcP_gain = acchange_values.shift()

                    player.action_points += AcP_gain
                    player.action_points = max(min(player.action_points, Game_state.maximum_player_AC), 0)
                })

                break
            }
        }
    }

    var states = player_1.player_states
    Object.keys( states ).forEach( state => {
        update_player_state(states, state, player_1)
    })
    var states = player_2.player_states
    Object.keys( states ).forEach( state => {
        update_player_state(states, state, player_2)
    })

    // update player effects  ///////////////////////////////////////////////////////////////////////////////////////
    var update_player_effect = (effects, effect, player) => {  //'buff':{'round': 3, 'action_point_mult': 1.5},
        if ( effect ) {
            effect['rounds'] && effect['rounds'] --

            if ( effect['rounds'] == 0 ) {
                effects[effect] = {}
            } 
        }
    }

    var effects = player_1.player_effects
    Object.keys( effects ).forEach( effect => {
        update_player_effect(effects, effect, player_1)
    })
    var effects = player_2.player_effects
    Object.keys( effects ).forEach( effect => {
        update_player_effect(effects, effect, player_2)
    })


    //update round events (crafting) ///////////////////////////////////////////////////////////////////////////////////////
    var update_round_events = (event, player) => {
        var evt = event.event
        
        switch (evt) {
            case 'craft': {
                let [item, round, no] = [event.item, event.round, event.amount]

                round == 1 ? player.dist_from_workbenches() <= 3 ? (player.add_item(item, no), player.craft_states(item), event.round --) : active_player==player && (message = 'Must be Next to Workbench to Collect Crafted Item') : event.round --
                break
            }
            case 'bandage': {
                player.player_states['bleeding'] = {}, event.round --
                break
            }
        }
    }

    var events = player_1.round_events
    events.forEach(event=>{update_round_events(event, player_1)})

    var events = player_2.round_events
    events.forEach(event=>{update_round_events(event, player_2)})

    var events = player_1.round_events
    for (let index = events.length-1; index >= 0; index--) {
        events[index].round == 0 && player_1.round_events.splice(index, 1)
    }

    var events = player_2.round_events
    for (let index = events.length-1; index >= 0; index--) {
        events[index].round == 0 && player_2.round_events.splice(index, 1)
    }


    //update player by environment ///////////////////////////////////////////////////////////////////////////////////////
    if ( player_1.is_drowning()  ) {
        active_player == player_1 && (player_1.heal(-10, 'drowning'))
    }
    if ( player_2.is_drowning() ) {
        active_player == player_2 && (player_2.heal(-10, 'drowning'))
    }
    

    //update things in environment ///////////////////////////////////////////////////////////////////////////////////////
    var mushroom_grow_cap = 1
    var mushrooms_grown = 0
    
    game_state.environment.forEach( ( y_array, index_y ) => {
        y_array.forEach( ( 一, index_x ) => {
            let terrain = game_state.environment[index_y][index_x]
            let terrain_last = terrain[terrain.length-1]
            try{var terrain_last_name = terrain_last['name']??terrain_last}catch{debugger}

            if ( terrain.includes('fire') ) {
                game_state.environment[index_y][index_x].splice(terrain.indexOf('fire'), 1)

                if ( game_state.environment[index_y][index_x].length == 1 && Game_state.environment_items.includes(game_state.environment[index_y][index_x][0]) ) game_state.environment[index_y][index_x] = game_state.environment[index_y][index_x][0]
            } 

            /// game state events changes to environment

            let values = Game_state.event_values[game_state.event]

            switch (game_state.event) {
                case 'winter': {
                    if ( terrain == 'water' ) {
                        game_state.environment[index_y][index_x] = ['ice']
                    }
                    for (let i=game_state.animals.length-1;i>=0;i--) {
                        if ( Game_state.die_in_winter_animals.includes(game_state.animals[i]) ) {
                            game_state.kill_animal(game_state.animals[i])
                        }
                    }
                    break
                }
                case 'spring': {
                    if ( terrain.includes('grass') ) {
                        Game_state.aoe((sel, _, pos) => {
                            if ( sel == 'dirt' ) {
                                random() <= values['grass_spread_chance'] && (game_state.environment[pos[1]][pos[0]] = ['dirt', 'grass'])
                                random() <= values['tree_grow_chance'] && (game_state.environment[pos[1]][pos[0]] = ['dirt', 'grass', 'tree'])
                            }
                        }, [index_x, index_y], 1)
                    }
                    break
                    break
                }
                case 'rain': {
                    if ( random() > .1 ) break

                    if ( terrain.includes('water') || terrain == 'water' ) {
                        Game_state.aoe((sel, _, pos) => {
                            if ( sel == 'dirt' || Game_state.floodable_terrain.includes(sel.name??sel) ) {
                                random() <= values['flood_water_spread_chance'] && (game_state.environment[pos[1]][pos[0]] = 'water')
                            }
                            else if ( sel[0] == 'dirt' && sel.slice(1).every(t=>{Game_state.floodable_terrain.includes(t.name??t)}) ) {
                                game_state.environment[pos[1]][pos[0]] = 'water'
                            }
                        }, [index_x, index_y], 1)
                    }
                    break
                }
                case 'bloodmoon': {
                    break
                }
                case 'meteorshower': {
                    if ( random() > game_state.get_event_mult('explosion_chance') ) break

                    Game_state.explode({'position': [index_x, index_y]}, game_state.get_event_mult('explosion_radius'), game_state.get_event_mult('explosion_max_damage'))

                    break
                }
                case 'drought': {
                    if ( random() > .1 ) break

                    if ( terrain.constructor == Array && terrain.includes('water') ) {
                        random() < .1 && game_state.environment[index_y][index_x].splice(terrain.indexOf('water'))
                        
                        if ( game_state.environment[index_y][index_x].length == 0) game_state.environment[index_y][index_x] = 'dirt'
                    }
                    else if ( terrain == 'water' ) game_state.environment[index_y][index_x] = 'dirt'
                    break
                }
                default : {   //fix changes to environment during events
                    if ( terrain == 'ice' ) {
                        game_state.environment[index_y][index_x] = 'water'
                    }
                }
            }
        
            //////////////////////////////////////////////////////////////////
            terrain = game_state.environment[index_y][index_x]

            if ( terrain.includes('mushroom') ) {
                if ( random() > .9 || mushrooms_grown >= mushroom_grow_cap ) return

                let mushroom_grow_positions = game_objects.spread(index_x, index_y, '', [], 2, false, ['dirt', 'darkland'], true)
                let mushroom_position = random(mushroom_grow_positions).position
                let grow_terrain = game_state.environment[mushroom_position[1]][mushroom_position[0]]
                mushrooms_grown ++

                grow_terrain.constructor == Array ? grow_terrain.length == 1 && game_state.environment[mushroom_position[1]][mushroom_position[0]].push('mushroom') : game_state.environment[mushroom_position[1]][mushroom_position[0]] = ['dirt', 'mushroom']
            }
            else if ( terrain_last_name == 'manuer' ) {
                random() < .2 && game_state.environment[index_y][index_x].pop()
                game_state.fix_terrain_dearray(index_x, index_y)
            }
            else if ( terrain_last_name == 'sapling' && terrain_last.watered ) {
                terrain_last.round ++

                if ( terrain_last.round >= Game_state.items_states['sapling']['grow_rounds'] ) {
                    game_state.environment[index_y][index_x] = ['dirt', 'grass', 'tree']
                    delete terrain_last
                }
            }
            else if ( terrain_last_name == 'wetcementwall' ) {
                let cementwall = {'name': 'cementwall', 'health': Game_state.items_states['cementwall']['health']}
                game_state.environment[index_y][index_x] = [terrain[0], cementwall]
            }
            else if ( terrain_last_name == 'wetcementfoundation' ) {
                game_state.environment[index_y][index_x].length == 1 ? game_state.environment[index_y][index_x] = ['cementfoundation'] : game_state.environment[index_y][index_x] = [terrain[0], 'cementfoundation']
            }
            else if ( terrain_last_name == 'crimsonroot' && game_state.day ) {
                game_state.environment[index_y][index_x] = 'dirt'
            }
            else if ( terrain_last_name == 'edenbush' ) {
                terrain_last.rounds < Game_state.items_states['edenbush']['maxrounds'] && terrain_last.rounds ++ 
            }
            else if ( terrain_last_name == 'campfire' ) {
                terrain_last.alight_ticks --
            }
            else if ( terrain_last_name == 'garden' || terrain_last_name == 'greenhouse' ) {
                var water_around = false

                Game_state.aoe((sel, 一, _) => {
                    if ( sel.includes('water') ) water_around = true
                }, [terrain_last.x, terrain_last.y], 1)
            }
            else if ( terrain_last_name == 'condenser' ) {
                terrain_last.items.push('water')
            }
            else if ( terrain_last_name == 'composter' ) {
                let composter = terrain_last
                let composting_items = composter.items

                if ( composting_items.length <= composter.rounds_composted_for ) {
                    let composting_value = 0
                    
                    
                    composting_items.forEach(item_dict => {
                        composting_value += Game_state.composter_item_values[item_dict.name].value
                    })
                    
                    let fertilizer_amount = Game_state.composter_conversion_ratio * composting_value

                    composter.items = []
                    composter.rounds_composted_for = 0

                    for (let i=0;i<fertilizer_amount;i++) {
                        composter.items.push({'name': 'fertilizer', 'rounds': 0})
                    }
                } else composter.rounds_composted_for ++
                
            }

            if ( Game_state.round_update_storers.includes(terrain_last_name) ) {
                // gs campfire item... {'grainSeed': {'round': 10, 'become': 'grain'},...}
                let x_items = Game_state[terrain_last_name + '_item_values'] ?? console.log('cooking broken')
                var new_items = []
                var delete_items = []
                var deleted_required = 0

                terrain_last['items'].forEach( item => {
                    if ( !x_items[item['name']] ) {
                        if ( terrain_last_name == 'shelf' || terrain_last_name == 'fridge' ) {
                            let food = item['name']
                            
                            item['round'] += Game_state.items_states[terrain_last_name]['perish_percent']
                            Game_state.items_states[food] && item['round'] >= Game_state.items_states[food]['perishing_rounds'] && delete_items.push(item) 
                        }
                    } else {
                        if ( x_items[item['name']].night_dormant && !game_state.day ) return 

                        let some = (object, item) => {let a=0; object.items.forEach(t=>{return t.name == item && a++}); return a-deleted_required>0}
                        let find_all = (object, item) => {return object.items.filter(t=>{return t.name == item}) }
                        let not_in_delete = items => {return items.filter(item => { return !delete_items.includes(item) } )[0] }
                        let add_round = (terrain_last_name == 'garden'||terrain_last_name == 'greenhouse') ? some(terrain_last, 'fertilizer') && terrain_last.watered : terrain_last_name == 'smelter' ? some(terrain_last, 'fuel') : true
    
                        item['round'] += !add_round ? 0 : (terrain_last_name == 'garden' ? game_state.get_event_mult('crop_grow_mult') : 1)
                        let rounds = x_items[item['name']]['rounds']
                        let become = x_items[item['name']]['become']
    
                        item['round'] >= rounds && ( delete_items.push(item), Object.entries(become).forEach(([newitem, no]) => { for (let i=0;i<no;i++) new_items.push({'name': newitem, 'round': 0}) } ), 
                            terrain_last_name == 'garden' ? item.name.includes('seed') && ( delete_items.push( not_in_delete(find_all(terrain_last, 'fertilizer')) ), deleted_required ++) : 
                            terrain_last_name == 'smelter' && ( delete_items.push( not_in_delete(find_all(terrain_last, 'fuel')) ), deleted_required ++) 
                        )
                    }
                })

                for (let i=terrain_last['items'].length-1;i>=0;i--) {
                    if ( delete_items.includes(terrain_last['items'][i]) ) {
                        terrain_last['items'].splice(i, 1)

                        if ( terrain_last_name == 'garden' || terrain_last_name == 'greenhouse' ) terrain_last.watered = false
                    }
                }
                for (item of new_items) {
                    if ( terrain_last['items'].length >= Game_state.items_states[terrain_last_name]['storage_capacity'] ) continue

                    terrain_last['items'].push(item)
                }
            } 

        })
    })

    //update animals (breeding)
    fed_animals = []
    game_state.animals.forEach(animal => {
        animal.fed && Game_state.breedable_animals.includes(animal.name) && fed_animals.push(animal)
    })
    fed_animals.forEach(animal1 => {
        fed_animals.forEach(animal2 => {
            if ( animal1.name != animal2.name || animal1 == animal2 || animal1.name.includes('baby') || animal2.name.includes('baby') ) return
            if ( math.distance(animal1.pos, animal2.pos) < 10 ) {
                let pilled = (animal1.pilled||animal2.pilled)
                if ( random() < (Game_state.animals[animal1.name]['breed_chance']+pilled?Game_state.items_states['mineralpill']['animal_breed_chance_increase']:0) ) {
                    let animal_name = 'baby'+animal1.name
                    let [x, y] = [animal1.pos[0], animal1.pos[1]]
                    
                    game_state.push_animal(x, y, animal_name)
                    pilled && random() < Game_state.items_states['mineralpill']['twin_chance'] && game_state.push_animal(x, y, animal_name)

                    animal1.fed = false, animal2.fed = false
                }
            }
        })
    })

    //delete changed alerts positions  ///////////////////////////////////////////////////////////////////////////////////////
    for (let i=changed_positions.length-1;i>=0;i--) {
        active_player == changed_positions[i][2] && changed_positions.splice(i, 1)
    }

    clickpath = []
    layer = 0

    //win lose conditions  ///////////////////////////////////////////////////////////////////////////////////////
    if (player_1.health <= 0 && ( !player_1.bases[0] || player_1.bases[0].type != 'prime' || player_1.max_health <= 0 ) ) {
        background(0, 255, 0)

        console.log('win for player 2')
        win_text = 'Player 2 won'
        delete player_1
        game_objects = {'draw_in_round':()=>{}}

        textSize(100);
        text(win_text, width_pixels/2-300, height_pixels/2-200)

        won = true
        win()
        return
    }
    else if (player_2.health <= 0 && ( !player_2.bases[0] || player_2.bases[0].type != 'prime' || player_2.max_health <= 0  ) ) {
        background(0, 255, 0)

        console.log('win for player 1')
        win_text = 'Player 1 won'
        delete player_2
        game_objects = {'draw_in_round':()=>{}}

        textSize(100);
        text(win_text, width_pixels/2-300, height_pixels/2-200)

        won = true
        win()
        return
    }
    else {
        game_objects.draw_in_round()
    }  
    
    if ( player_1.health <=0 ) {
        respawn_player('player_1')
    }
    else if ( player_2.health <=0 ) {
        respawn_player('player_2')
    }

}

//__________________________________________________________________________________________________________

function polygon(x, y, radius, npoints) {
    let angle = TWO_PI / npoints;

    beginShape();
    for (let a = 0; a < TWO_PI; a += angle) {
        let sx = x + cos(a) * radius;
        let sy = y + sin(a) * radius;
        vertex(sx, sy);
    }
    endShape(CLOSE);
}

function star(x, y, radius1, radius2, npoints) {
    let angle = TWO_PI / npoints;
    let halfAngle = angle / 2.0;
    
    beginShape();
    for (let a = 0; a < TWO_PI; a += angle) {
        let sx = x + cos(a) * radius2;
        let sy = y + sin(a) * radius2;
        vertex(sx, sy);
        sx = x + cos(a + halfAngle) * radius1;
        sy = y + sin(a + halfAngle) * radius1;
        vertex(sx, sy);
    }
    endShape(CLOSE);
}

const pixel_to_grid = ( x_pixel, y_pixel ) => {
    var x_grid = x_pixel / block_width, y_grid = y_pixel / block_height
    x_grid = Math.floor( x_grid ), y_grid = Math.floor( y_grid )

    x_grid += camera_x - camera_width/2
    y_grid = -y_grid + camera_y + camera_height/2

    return [ x_grid, y_grid ]
}

const camera_grid = ( x_grid, y_grid ) => {
    x_grid = camera_width/2 - camera_x + x_grid
    y_grid = camera_height/2 + camera_y - y_grid 

    return [ x_grid, y_grid ]
}

const getRandomInt = ( max ) => {
    return Math.floor( Math.random() * max );  
}

const random_height = () => {
    return ( height - spawn_height)/2 + getRandomInt( spawn_height )
}

const respawn_player = (player) => {
    let prime_base = player=='player_1' ? player_1.bases[0] : player_2.bases[0]
    let player_dict = { landing_x: prime_base.x+1, landing_y: prime_base.y+1, items: {}, name: player, max_health: player=='player_1' ? player_1.max_health - 10 : player_2.max_health - 10 }

    player=='player_1' ? player_1.reset(player_dict) : player_2.reset(player_dict)
    player=='player_1' ? game_state.turn = player_2 : game_state.turn = player_1

    game_objects.draw_in_round()
}

const initiate_round = ( { player_1_x, player_1_y, player_1_items }={}, { player_2_x, player_2_y, player_2_items }={} ) => {
    
    window.base_update_intervals = []

    player_1_x = player_1_x | getRandomInt( width - 2 ) + 1
    player_1_y = player_1_y | getRandomInt( height - 2 ) + 1
    player_2_x = player_2_x | getRandomInt( width - 2 ) + 1
    player_2_y = player_2_y | getRandomInt( height - 2 ) + 1


    player_1_dict = { landing_x: player_1_x, landing_y: player_1_y, items: player_1_items, name: 'player_1' }
    player_2_dict = { landing_x: player_2_x, landing_y: player_2_y, items: player_2_items, name: 'player_2' }

    player_1 = new Player(player_1_dict)
    player_2 = new Player(player_2_dict)

    // player_1_base = new Base(player_1_x + 1, player_1_y)
    // player_2_base = new Base(player_2_x - 1, player_2_y)
    
    game_state.turn = player_1

    player_1.enemy = player_2
    player_2.enemy = player_1

    window.update_player1_states_by_tick_interval = window.setInterval( () => {player_1.update_states_by_tick()}, 1000 )
    window.update_player2_states_by_tick_interval = window.setInterval( () => {player_2.update_states_by_tick()}, 1000 )

    game_state.generate_animals()

    // player_2.x = player_1.x+1
    // player_2.y = player_1.y
    //player_1.items['dagger']=1

    setTimeout(respawn_player('player_1'), 1000);
    setTimeout(respawn_player('player_2'), 2000);

}

const update_changed_position_alert = (terrain, x, y, player) => {
    ( terrain == 'dirt' || terrain.constructor == Array && terrain.length == 1 && ['darkland', 'mountain1', 'mountain2'].includes(terrain[0]) ) && changed_positions.push([x, y, player])
}

const greatest_dot = (origin, moveable_area, to_object) => {
    moveable_area.forEach(node=>{node.dot = (node.position[0] - origin[0]) * to_object[0] + (node.position[1] - origin[1]) * to_object[1]})
    let moving_position = moveable_area.sort((a, b) => {return b.dot - a.dot})[0]

    return moving_position
}

const count = items => {
    let materials = {}

    items.forEach(material => {materials[material] ? materials[material] ++ : materials[material] = 1})

    return materials

}

// _____________________________________________________________________________

const win = () => {
    window.clearInterval(environment_object_update_interval)
    window.clearInterval(animal_move_interval)
    window.clearInterval(update_player1_states_by_tick_interval)
    window.clearInterval(update_player2_states_by_tick_interval)
    window.base_update_intervals.forEach(i=>{window.clearInterval(i)})
}


const save = () => { 

    var pp1 = {}, pp2 = {}
    player_1.bases.forEach( base => {
        base.parent = 'player_1'
    })
    player_2.bases.forEach( base => {
        base.parent = 'player_2'
    })
    Object.keys(player_1).filter(a=>{return typeof player_1[a] != 'function' && a != 'closed_nodes' && a != 'movement_area' && a != 'enemy'}).forEach( atr => {
        pp1[atr] = player_1[atr]
    })
    Object.keys(player_2).filter(a=>{return typeof player_2[a] != 'function' && a != 'closed_nodes' && a != 'movement_area' && a != 'enemy'}).forEach( atr => {
        pp2[atr] = player_2[atr] 
    })

    game_state.turn = game_state.turn == player_1 ? 'player_1' : 'player_2'
    
    var ggs = JSON.stringify(game_state)
    var ccp = JSON.stringify(changed_positions)

    player_1_save_file = JSON.stringify(pp1)
    player_2_save_file = JSON.stringify(pp2)
    game_state_save_file = ggs
    changed_position_save_file = ccp
}

const load = () => {
    var pp1 = JSON.parse(player_1_save_file)
    var pp2 = JSON.parse(player_2_save_file)
    var ggs = JSON.parse(game_state_save_file)
    var ccp = JSON.parse(changed_position_save_file)

    pp1.bases.forEach( base => {
        base.parent = player_1
    })
    pp2.bases.forEach( base => {
        base.parent = player_2
    })

    Object.keys(pp1).forEach( atr=> {
        player_1[atr]=pp1[atr]
    })
    Object.keys(pp2).forEach( atr=> {
        player_2[atr]=pp2[atr]
    })

    ggs.turn = ggs.turn=='player_1'?player_1:player_2
    Object.keys(ggs).forEach( atr=> {
        game_state[atr]=ggs[atr]
    })
    changed_positions = ccp
}