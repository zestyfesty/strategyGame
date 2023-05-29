//copyright jacky kuang
//no distribution otherwise you are inbreach of federal law you kundi
class Base{
    constructor (landing_x, landing_y, parent, type) {
        this.x = landing_x
        this.y = landing_y

        this.health = 200
        this.parent = parent
        this.items = {'stick':0, 'rock':0, 'leaf':0}
        this.storing = 0
        this.max_storable = 30

        this.base_states = {'burning':{}}

        this.name = 'base'

        this.type = type ?? 'normal'

        window.base_update_intervals.push( window.setInterval( () => {this.update_states_by_tick()}, 1000 ) )
    }

    give_buff = (buff, ticks=undefined) => {
        this.base_states[buff] = {'ticks':ticks??Game_state.general_states[buff]['ticks']}
    }

    heal = (health, evt) => {
        this.health += health

        if ( this.health <= 0 ) {
            game_state.environment[this.y][this.x].splice(game_state.environment[this.y][this.x].indexOf(this), 1)
            this.parent.bases.splice(this.parent.bases.indexOf(this), 1)
            game_state.fix_terrain_dearray(this.x, this.y)
        }
    }

    burning = () => {
        let burn_damage = Game_state.general_states['burning']['damage']
        var burnables = Game_state.burnable_items
        var lose_item_chance = Game_state.general_states['lose_item_from_burning']

        this.heal(-burn_damage, 'burn')
        burnables.some( item => {
            if ( this.items[item] && math.random() < lose_item_chance ) {
                this.items[item] --, game_state.turn == this.parent && (message = `base lost ${item} from fire`) 
                return true
            }
        })
    }

    del_base = () => {
        game_state.environment[this.y][this.x].splice(game_state.environment[this.y][this.x].indexOf(this), 1)
        game_state.fix_terrain_dearray(this.x, this.y)
        this.parent.bases.splice(this.parent.bases.indexOf(this), 1)
    }

    update_states_by_tick = () => {
        let done = false

        this.base_states['burning']['ticks'] != undefined && game_state.turn == this.parent && ( done = true, this.base_states['burning']['ticks'] --, this.burning(), message = `base burning, health: ${this.health}`, this.base_states['burning']['ticks'] <= 0 && (this.base_states['burning'] = {}) ) 
        
        done && game_objects.draw_in_round()
    }

    invest = () => {
        for (let k of Object.keys(this.items)) {
            let increase = min(min(this.items[k] / sqrt(this.storing) / 5, 3), this.max_storable - this.storing)
            this.items[k] += increase
            this.storing += increase
            if (this.items[k]==NaN) debugger
        }
    }

    store = (item, amount) => {
        if ( this.parent.items[item] < amount || this.max_storable-this.storing<amount ) {message = 'max capacity reached'; return}

        this.parent.items[item] -= amount, this.items[item] += amount
        this.storing += amount
    }

    extract = (item, amount) => {
        if ( this.items[item] < amount ) return

        this.parent.add_item(item, amount), this.items[item] -= amount
        this.storing -= amount
    }

    damage = (health, evt) => {
        this.health -= health
        game_state.turn == this.parent && (message = 'base getting damaged')
    }
}

class Node{
    constructor ( position = []) {
        this.position = position

        this.g = 0

        this.name = 'node'
    }

    equal = ( other ) => {
        return ( this.position[0] == other[0] && this.position[1] == other[1] ) 
    }
}


class Player {
    //settings:

    static Attributes = ['x', 'y', 'name', 'health', 'action_points', 'items', 'items_states', 'player_states', 'material_capacity', 'crafted_item_capacity', 'bases', 'max_dist', 'max_throw_dist', 'see_dist', 'selection', 'current_map_terrain']
    static base_states = {'burning': {}, 'poison': {}, 'bleeding': {}, 'drunk': {}, 'trapped': false, 'action_point_gain': [], 'stun': {}, 'shiv_speed': {}, 'sickness': {}}
    static base_effects = {'broken_leg': {}, 'broken_arm': {}, 'fat': {}, 'buff': {}, 'dumb': {}, 'high': {}, 'dazed': {}, 'tangled': {}, 'encumbered': false, 'hunger': false, 'dirty': false}
    //make copy of the dicts

    constructor ({landing_x, landing_y, items, name}) {
        this.x = landing_x
        this.y = landing_y

        let terrain = game_state.environment[landing_y][landing_x];
        console.log(terrain);
        (terrain.includes('water')||terrain.includes('tree')) && ( terrain.constructor==Array ? terrain[0] == 'water' ? (game_state.environment[landing_y][landing_x] = 'dirt') : (game_state.environment[landing_y][landing_x]=terrain[0]) : game_state.environment[landing_y][landing_x]='dirt' )
        game_state.fix_terrain_dearray(landing_x, landing_y)

        this.name = name

        this.health = 100
        this.max_health = 100
        this.action_points = 20
        this.hunger = 100
        this.items = items??{'dam': 10, 'fishfeeder': 10, 'trophy': 10, 'carcasscollector': 1, 'hammock': 10, 'wetcement': 10, 'scaffold': 100, 'ironwall':1, 'binocular': 1, 'workbench': 1, 'wood': 2, 'fertilizer': 10, 'composter': 1, 'manuer': 10, 'glass': 10, 'drafter': 1, 'plank': 100, 'smoothstone': 10, 'woodenpillar': 10, 'stonepillar': 10, 'cement': 10, 'wheat': 100, 'wheatSeed':10, 'lasso':1, 'mushroom': 10, 'tulip': 10, 'dandelion': 10, 'chickweed': 10, 'stingingnettle': 10, 'cauldron':1, 'hoe': 1, 'axe': 1, 'bottle':1, 'climbinggear':1, '古琴': 1, 'dagger': 1, 'stick': 10, 'rock': 10, 'leaf': 10, 'nettrap':1, 'campfire':1, 'smelter': 1, 'food': 1, 'iron': 10, 'shovel': 1, 'mud':10,'bottle':1, 'beacon':2}//{'food': 1, 'campfire':5, 'beacon':5, 'stick': 10, 'rock': 10, 'mudwall':10, 'leaf': 10, 'dirt': 10, 'mud': 10, 'climbinggear': 1, 'base': 5, 'rockwall': 5, 'leafcover': 5, 'ladder': 2, 'plank': 5, 'torch': 1, 'bottle': 5} ?? items    //should be no invalid values not null or undefined..
        this.items_states = {'torch': [], 'fireball': [], 'bottle': [{'holding': 'poison'}, {'holding': 'poison'}, {'holding': 'poison'}, {'holding': 'poison'}, {'holding': 'poison'}], 'bomb': [], 'crossbow': [{'loaded': false}]}      //holding: poison
        this.item_durabilities = {'shovel': [10]} //ie  'dagger' : [3, 2, 1] = 3 daggers 1 with 3 and so on
        this.player_states = Object.assign({}, Player.base_states)
        this.player_effects = Object.assign({}, Player.base_effects) //ailments or buffs
        this.round_events = []

        this.material_capacity = 1500
        this.crafted_item_capacity = 1000

        let basex=landing_x+(name == 'player_1' ? 1 : -1), basey=landing_y
        let base = new Base(basex, basey, this, 'prime')
        this.bases = [base]
        game_state.environment[basey][basex] = game_state.environment[basey][basex].constructor == Array ? [game_state.environment[basey][basex][0]=='water'?'dirt':game_state.environment[basey][basex][0], base] : ['dirt', base]
        this.workbenches = []
        this.cauldrons = []
        this.drafters = []
        this.movement_area = []
        this.max_dist = 10       //max walking dist
        this.mapped = false
        this.max_throw_dist = 10

        this.see_dist = 10
        this.seeable_positions = []
        this.magic_sight = []
        this.binocular_position = []

        this.selection;
        this.current_map_terrain = game_state.environment[this.y][this.x]


    }

    displace = (x, y) => {
        [this.x, this.y] = [x,y]
        this.current_map_terrain = game_state.environment[y][x]
    }

    doable = action => {
        let restricted = false

        Object.keys(this.player_states).forEach(state => {
            if ( !this.has_state(state) ) return 

            let undoables = Game_state.general_states[state] && Game_state.general_states[state]['undoable']

            undoables && undoables.includes(action) && (restricted = true)
        })
        return !restricted
    }

    reset = ({landing_x, landing_y, items, name, max_health}) => {
        this.x = landing_x
        this.y = landing_y
        this.name = name
        this.health = max_health
        this.max_health = max_health
        this.action_points = 20
        this.hunger = 100
        this.items = items??{}
        let terrain = game_state.environment[landing_y][landing_x];
        (terrain.includes('water')||terrain.includes('tree')) && ( terrain.constructor==Array ? terrain[0] == 'water' ? (game_state.environment[landing_y][landing_x] = 'dirt') : (game_state.environment[landing_y][landing_x]=terrain[0]) : game_state.environment[landing_y][landing_x]='dirt' )
        this.items_states = {'torch': [], 'fireball': [], 'bottle': [{'holding': 'poison'}], 'bomb': []}      //holding: poison
        this.item_durabilities = {} 
        this.player_states = Object.assign({}, Player.base_states)
        this.player_effects = Object.assign({}, Player.base_effects) //ailments or buffs
        this.round_events = []
        this.material_capacity = 15
        this.crafted_item_capacity = 10
        this.movement_area = []
        this.max_dist = 10      
        this.mapped = false
        this.max_throw_dist = 10
        this.see_dist = 10
        this.seeable_positions = []
        this.magic_sight = []
        this.binocular_position = []
        this.selection
        this.current_map_terrain = game_state.environment[this.y][this.x]
    }

    give_buff = (buff, ticks=undefined) => {
        let block_effect_chance = 0

        Object.keys(this.items).forEach(item => {
            Game_state.items_states[item] && Game_state.items_states[item]['blockeffect'] && Game_state.items_states[item]['blockeffect'][buff] && (block_effect_chance += Game_state.items_states[item]['blockeffect'][buff])
            //player effects and buffs 
        })
        if ( random() < block_effect_chance ) return 

        Game_state.player_effects[buff] ? this.player_effects[buff] = {'round': Game_state.player_effects[buff]['round']} :
        Game_state.general_states[buff] && (this.player_states[buff] = {'ticks': ticks??Game_state.general_states[buff]['ticks']})
    }

    heal = (health, evt) => {  //poison, burning, hunger, bleeding, eat, trap, hit, sharp, spread, bludgen, drowning, magic, medicine
        let heal_change = () => {
            let mult = 1

            Object.entries(this.items).some(([name, amt]) => {
                let item_values = Game_state.items_states[name]  //'block': {'sharp': .75, 'bludgen': 80}

                if ( !amt || !(item_values && item_values['block'] && item_values['block'][evt]) ) return

                let dursub = item_values['dursubper']  //dursub per health point
                dursub && this.use_durability(name, floor(health*dursub))

                if ( item_values['absorb_damage'] && health <= item_values['absorb_damage'] ) {mult *= 0; return true} //fat armor absorb damage under threshold

                mult *= item_values['block'][evt]
            })
            Object.keys(this.player_states).forEach(state => {
                if ( !this.has_state(state) ) return

                Game_state.general_states[state] && health < 0 && Game_state.general_states[state]['damaged_mult'] && (mult *= Game_state.general_states[state]['damaged_mult'])
                // health > 0 && Game_state.general_states[state]['resistence_mult'] && (mult *= Game_state.general_states[state]['resistence_mult'])
            })
            Object.entries(this.player_effects).forEach(([effect, dict]) => {
            })

            return mult
        }

        var blocked_percent = 1

        if ( health < 0 ) {  
            blocked_percent = heal_change()

            blocked_percent > 1 && (message = `damage inflicted increased by ${round(blocked_percent*100)} percent: ${evt}`, game_objects.draw_in_round())
            blocked_percent < 1 && (message = `blocked by ${round((1-blocked_percent)*100)} percent: ${evt}`, game_objects.draw_in_round())
        }

        this.health += health * blocked_percent
        this.health = max(min(this.health, this.max_health), 0)

        if ( this.health <= 0 ) {
            game_state.next_turn()
        }
    }

    increase_AC = () => {
        let increase = Game_state.action_points_gain_per_turn
        let maxAC = Game_state.maximum_player_AC
        let mult = Game_state.ACexp_mult
        increase *= 1.5**(this.action_points*mult)

        this.action_points = min(this.action_points+increase, maxAC)
    }

    burning = () => {
        let burn_damage = Game_state.general_states['burning']['damage']
        var burnables = Game_state.burnable_items
        var lose_item_chance = Game_state.general_states['burning']['lose_item_chance']

        this.heal(-burn_damage, 'burning')
        burnables.some( item => {
            if ( this.items[item] && math.random() < lose_item_chance ) {
                this.items[item] --, message = `lost ${item} from fire` 
                return true
            }
        })
    }

    poisoned = () => {
        let poison_damage = Game_state.general_states['poison']['damage']
        this.health > poison_damage + 1 && this.heal(-poison_damage, 'poison')
    }

    bleeding = () => {
        let bleeding_damage = Game_state.general_states['bleeding']['damage']
        this.heal(-bleeding_damage, 'bleeding')
    }

    sickness = () => {
        let [hungerloss, acploss] = [Game_state.general_states['sickness']['hunger_loss'], Game_state.general_states['sickness']['action_point_loss']]
        this.hunger = max(0, this.hunger - hungerloss)
        this.action_points = max(0, this.action_points - acploss)
    }

    has_state = state => {
        return Object.keys(this.player_states[state]??{}).length!=0 && (this.player_states[state].constructor == Object ? this.player_states[state]['ticks'] : this.player_states[state].constructor == Array ? this.player_states[state].length != 0 : this.player_states[state])
    }

    has_effect = effect => {
        return this.player_effects[effect] && (this.player_effects[effect].constructor == Object ? this.player_effects[effect]['round'] : this.player_effects[effect])
    }

    some_effect = effects => {
        return effects.some(effect=>{return this.has_effect(effect)} )
    }

    is_drowning = () => {
        return this.current_map_terrain.includes('water') && !this.current_map_terrain.includes('bridge') && !this.current_map_terrain.includes('lilypad') && !this.items['raft'] && !this.items['divinggear'] && !this.items['flippers']
    }

    update_states_by_tick = () => {
        let done = false

        //hunger
        game_state.turn == this && (this.hunger -= Game_state.hungerloss_per_tick, this.hunger = max(this.hunger, 0));
        game_state.turn == this && this.hunger <= 1 && (this.heal(-1, 'hunger'), message = 'you are starving', done = true);
        this.player_effects['hunger'] = this.hunger <= 20 ? true : false

        //burning
        this.player_states['burning']['ticks'] != undefined && game_state.turn == this && ( done = true, ( this.current_map_terrain.constructor == Array ? this.current_map_terrain.includes('water'): this.current_map_terrain == 'water' ) ? (this.player_states['burning'] = {}) : ( this.player_states['burning']['ticks'] --, this.burning(), message = `burning, health: ${round(this.health)}`, this.player_states['burning']['ticks'] <=0 && (this.player_states['burning'] = {}, message = '') ) )
        
        //bomb explosion
        let explosion_ticks = Game_state.items_states['bomb']['explosion_ticks']
        for (let i=this.items_states['bomb'].length;i>=0;i--) {
            let bomb = this.items_states['bomb'][i]
            if ( !bomb ) continue

            bomb['ticks'] != undefined && ( done=true, message='bombs a ticking', bomb['ticks'] ++, bomb['ticks'] >= explosion_ticks && (done = true, Game_state.explode(bomb), this.items_states['bomb'].splice(i, 1), bomb['position'][0] == this.x && bomb['position'][1] == this.y && this.subtract_item('bomb',1) ) )
        }

        let update_tick = (state, mes, callback=function(){}, end_mes) => {
            !this.player_states[state] && (this.player_states[state] = {'ticks': 0})
            game_state.turn == this && this.player_states[state]['ticks'] != undefined && ( done = true, ( this.player_states[state]['ticks'] --, callback(), message = mes, this.player_states[state]['ticks'] <= 0 && (this.player_states[state] = {}, message = end_mes) ) )
        }

        //base heal
        if ( this.dist_from_bases() < 2 && game_state.turn == this ) this.heal(Game_state.base_heal_per_tick, 'rest')

        //dirty
        this.player_effects['dirty'] && random() < Game_state.items_states['manuer']['sickness_chance'] && this.give_buff('sickness') && (message = 'you got sick')

        //drowning
        game_state.turn == this && this.is_drowning() && (message = 'you\'re drowning') 

        //smog
        game_state.turn == this && this.current_map_terrain.constructor == Array && this.current_map_terrain.some(t=>{return t.name=='smog'}) && !this.items['mask'] && (done = true) && (message = 'you\'re suffocating in smog', random() < Game_state.items_states['smog']['poisoning_chance'] && this.give_buff('poison'), this.heal(-Game_state.items_states['smog']['damage'], 'drowning')) 

        //poisoned
        update_tick('poison', `poisoned, health: ${round(this.health)}`, this.poisoned)

        //sickened
        update_tick('sickness', 'got sick', this.sickness)

        //bleeding
        update_tick('bleeding', `bleeding, health: ${round(this.health)}`, this.bleeding)

        //drunk
        update_tick('drunk', `your drunk`)
       
        //shiv speed
        update_tick('shiv_speed', `fast one with shiv`, undefined, 'shiv_speed wore out')

        //stun
        update_tick('stun', `you're stunned`, undefined, 'stun no more')


        done && !game_state.auto_drawn_move && game_objects.draw_in_round()

        // item check
        this.player_effects['encumbered'] = false

        this.items['battleaxe'] && (this.player_effects['encumbered'] = true)
        this.items['backpack'] && (this.player_effects['encumbered'] = true)

    }
    
    use_action_points = (base_no, action) => {
        var multi = 1
        
        var E = effects => {
            let mult = 1
            
            effects.forEach(effect=>{
                mult *= this.has_effect(effect)?Game_state.player_effects[effect]['action_point_mult']:1
                mult *= this.has_state(effect)?Game_state.general_states[effect]['action_point_mult']:1
            })
            return mult
        }
        
        switch (action) {
            case 'move': {
                multi *= E(['tangled', 'broken_leg', 'fat', 'high', 'dazed', 'encumbered', 'hunger', 'shiv_speed'])
                break
            }
            case 'craft': {
                multi *= E(['broken_arm', 'dumb'])
                break
            }
            case 'throw': {
                multi *= E(['broken_arm', 'fat', 'high', 'buff', 'hunger'])
                break
            }
            case 'use': {
                multi *= E(['broken_arm', 'fat', 'high', 'buff', 'dazed'])
                break
            }
            case 'collect': {
                multi *= E(['broken_arm'])
                break
            }
        }
        
        return base_no*multi
    }
    
    eat_food = food => {
        let hunger_gain = Game_state.items_states[food]['hunger_gain'], health_gain = Game_state.items_states[food]['heal'] ?? 0
        let AcP_gain = Game_state.items_states[food]['action_points_gain'] 
        
        this.heal(health_gain, 'eat'), this.hunger = min(this.hunger + hunger_gain, 100)
        this.subtract_item(food, 1)

        switch (food) {
            case 'mushroom': {
                random() < Game_state.items_states['mushroom']['poison_chance'] && this.give_buff('poison')
                random() < Game_state.items_states['mushroom']['high_chance'] && this.give_buff('high')
                break
            }
            case 'rottenpotato': {
                random() < Game_state.items_states['rottenpotato']['poison_chance'] && this.give_buff('poison')
                break
            }
            case 'rottencarrot': {
                random() < Game_state.items_states['rottencarrot']['poison_chance'] && this.give_buff('poison')
                break
            }
        }
        
        AcP_gain && this.player_states['action_point_gain'].push(AcP_gain)
    }
    
    get_item = () => {
        let materials_amount = math.sum(Object.entries(this.items).filter(([item, amt]) => {return Game_state.materials.includes(item)}).map(entry=>{return entry[1]}))
        if ( this.items['backpack'] ) {
            materials_amount = max(materials_amount - Game_state.items_states['backpack']['storage_capacity'], 0)
        }
        let other_amount = math.sum(Object.values(this.items)) - materials_amount
        if ( this.items['quiver'] ) {
            other_amount -= min(this.items['arrow'], Game_state.items_states['quiver']['storage_capacity']) ?? 0
        }
        let available_material_space = max(this.material_capacity-materials_amount, 0)
        let available_other_space = max(this.crafted_item_capacity-other_amount, 0)
        
        return [other_amount, materials_amount, available_material_space, available_other_space]
    }

    add_durability = item => {
        if ( !(Game_state.items_states[item] && Game_state.items_states[item]['durability']) ) return
        
        var dur = Game_state.items_states[item]['durability']

        this.item_durabilities[item] ? this.item_durabilities[item].push(dur) : (this.item_durabilities[item]=[dur])
    }

    add_perishing_rounds = item => {
        if ( !(Game_state.items_states[item] && Game_state.items_states[item]['perishing_rounds']) ) return

        this.items_states[item] ? this.items_states[item].push({'round': 0, 'perishing': true}) : (this.items_states[item]=[{'round': 0, 'perishing': true}])
    }
    
    use_durability = (item, sub) => {
        if ( !this.item_durabilities[item] ) return 

        let ind = this.item_durabilities[item].indexOf(min(this.item_durabilities[item]))
        let durs = this.item_durabilities[item]
        durs[ind] -= sub
        
        min(durs) == 0 && (durs.splice(durs[ind], 1), this.subtract_item(item, 1), this.items_states[item] && this.items_states[item].pop() )
    }
    
    add_item = (item, add_amount=1) => { 
        var [other_amount, materials_amount, available_material_space, available_other_space] = this.get_item()
        let item_is_material = Game_state.materials.includes(item)
        
        item_is_material ? ( add_amount + materials_amount > this.material_capacity && ( message = `maximum material carry reached, lost ${add_amount - available_material_space}, ${item}`, add_amount = available_material_space ) ) :
        ( other_amount + add_amount > this.crafted_item_capacity && ( message = `maximum material carry reached, lost ${add_amount - available_other_space}, ${item}`, add_amount = available_other_space ) ) 
        
        add_amount != 0 && ( this.items[item] ? this.items[item] += add_amount : (this.items[item] = add_amount), Array(add_amount).fill('').forEach(_=>{this.add_durability(item), this.add_perishing_rounds(item)}) )
        
    }
    
    subtract_item = (item, sub_amount=1) => {
        this.items[item] -= sub_amount

        this.item_durabilities[item]&&this.item_durabilities[item].length&&this.item_durabilities[item].shift()

        if ( this.items_states[item]&&this.items_states[item].length ) {
            let state = this.items_states[item]

            if ( state[0]['round'] ) {
                this.items_states[item].splice(state.indexOf(state.sort((state1, state2)=>{return state1['round']>state2['round']})[0]), 1)
            }
            else if ( state[0]['ticks'] ) {
                this.items_states['bomb'].splice(state.indexOf(state.sort((state1, state2)=>{return state1['ticks']>state2['ticks']})[0]), 1)
            } else 
            this.items_states[item].shift()
        }

        this.items[item] == 0 && delete this.items[item]
    }
    
    drunk_selection = () => {
        let radius = Game_state.general_states['drunk_selection_radius']
        this.selection = [round(max(min(this.x + (Math.random()*2-1)*radius, width-1), 0)), round(max(min(this.y + (Math.random()*2-1)*radius, height-1), 0))]
    }
    
    evaluate_selection = (sel = undefined) => {
        let interselection = sel ?? this.selection 
        
        if ( !interselection || interselection.constructor != Array ) return
        
        let [selection_x, selection_y] = interselection
        
        var enemy = this.enemy
        
        if ( selection_x == enemy.x && selection_y == enemy.y ) {
            interselection = 'enemy'
        }
        else if ( selection_x == this.x && selection_y == this.y ) {
            interselection = 'player'
        }
        else {
            interselection = game_state.environment[selection_y][selection_x]
        }
        if ( sel ) {
            return interselection
        }
        else this.selection = interselection
    }

    check_liquid = (liquid, required, del=false, return_amount=false) => {
        let stored = 0
        let liquid_ind = []

        this.items_states['bottle'].forEach( (bottle, i) => { 
            if ( bottle['holding'] == liquid ) {
                stored ++
                liquid_ind.push(i)
            }
        })
        if ( del && stored != 0 ) {
            for (let i=0;i<required;i++) {
                this.items_states['bottle'].splice(liquid_ind[i], 1)
            }
        }
        if ( !return_amount ) {            
            if ( stored>=required ) return true
            else return false
        }else 
            return stored

    }

    take = (item, obj) => {
        let ind = obj['items'].indexOf( obj['items'].filter( storeditem => {return storeditem['name'] == item} )[0] )

        obj.items.splice(ind, 1)

        if ( item == 'water' || item == 'poison' ) {
            this.items['bottle'] && this.items_states['bottle'].length < this.items['bottle'] && this.items_states['bottle'].push({'holding': item})
        } else 
        this.add_item(item, 1)
    }

    move_action_points = (x, y) => {
        for ( let node of this.closed_nodes ) {
            if ( !(node.position[0] == x && node.position[1] == y ) ) continue
            return node.g
        }
    }

    collect_material = () => {
        if ( !this.selection ) return

        let [x_grid, y_grid] = this.selection
        var map_terrain = game_state.environment[y_grid][x_grid]
        this.current_map_terrain = game_state.environment[this.y][this.x] 

        if ( math.distance( [x_grid, y_grid], [this.x, this.y] ) < 1.5 ) {
            
            if ( x_grid==this.enemy.x &&y_grid==this.enemy.y ) return
            
            if ( map_terrain.constructor == Array ) {
                game_state.terrain_effect(this, map_terrain)

                if ( game_state.is_hole(map_terrain) ) {
                    this.x = x_grid, this.y = y_grid
                    message = 'fell into hole trap'
                    this.current_map_terrain = map_terrain

                    if ( map_terrain.includes('leafcover') ) {
                        map_terrain.pop()
                    }
                }
                else if ( map_terrain[map_terrain.length-1]['name'] == 'beacon' ) {
                    map_terrain[map_terrain.length-1]['power'] = !map_terrain[map_terrain.length-1]['power']
                }
                else if ( map_terrain[map_terrain.length-1]['name'] == 'fencegate' ) {
                    map_terrain[map_terrain.length-1]['open'] = !map_terrain[map_terrain.length-1]['open']
                }
                else if ( Game_state.environment_items.concat(['mushroom', 'tulip', 'lilypad', 'cattail', 'mussel', 'shell', 'cementpowder', 'manuer', 'mud', 'hammock', 'chickweed', 'dandelion', 'wood']).includes(map_terrain[map_terrain.length-1]) ) {
                    if ( !this.same_level(map_terrain) ) { message = 'terrain level invariance'; return }
                    if ( this.action_points < 2 ) { message = 'not enough AcP'; return }

                    if ( map_terrain[map_terrain.length-1]=='mushroom' ) {
                        random() < Game_state.items_states['mushroom']['poison_chance'] && this.give_buff('poison')
                    }
                    else if ( map_terrain[map_terrain.length-1]=='manuer' ) {
                        !this.items['glove'] && (this.player_effects['dirty'] = true)
                    }

                    this.add_item( map_terrain[map_terrain.length-1] , 1 ), map_terrain.pop()
                    this.action_points -= this.use_action_points(2, 'collect')
                }
                
            }
            else {  
                if ( !this.same_level(map_terrain) ) { message = 'terrain level invariance'; return }

                Game_state.environment_items.includes(map_terrain) && (game_state.environment[y_grid][x_grid]='dirt', this.add_item( map_terrain, 1 ), this.action_points -= this.use_action_points(2, 'collect'))
                
                return
            }

        } else {
            message = 'Too far away, can\'t pick up, double press to move'
            
            return
        }
        this.current_map_terrain = game_state.environment[this.y][this.x]
                
    }

    move = () => {
        if ( !this.doable('move') ) {message = 'action disabled by player states'; return}
        if ( !this.selection ) return
        
        let [x_grid, y_grid] = this.selection
        var map_terrain = game_state.environment[y_grid][x_grid]
        this.current_map_terrain = game_state.environment[this.y][this.x]     //changed +++++++++++++++++++++++++++++++++++++
        var dist = math.distance([this.x, this.y], this.selection)
        
        if ( this.in_movement_area( [x_grid, y_grid] ) ) {            //moving 
            let [x, y] = [x_grid, y_grid];
            [this.x, this.y] = [x, y]
            this.action_points -= this.move_action_points(x, y)   //don't put this.useactionpoints
            !this.items['slientboots'] && changed_positions.push([x, y, this])
            let landmines_stepped = []
            this.mapped = false
            //landmine detonating
            game_state.landmines.some(pos=>{return math.distance(pos, [x, y]) <= Game_state.landmine_radius && (Game_state.explode({'exploded':false, 'position':pos}), landmines_stepped.push(pos), true) })
            for (let index = game_state.landmines.length-1; index >= 0; index--) {
                landmines_stepped.some(pos=>{return game_state.landmines[index][0] == pos[0]&&game_state.landmines[index][1] == pos[1]}) && game_state.landmines.splice(index, 1)
            }
            //stepped in twinenet
            let net_in_prox = false
            Game_state.aoe((sel, dist, _) => {
                if ( sel.includes('twinene') && dist < 1.5 ) {
                    net_in_prox = true
                }
            }, [x, y], 2)
            if ( game_state.environment[this.y][this.x].includes('water') && net_in_prox ) {
                this.give_buff('tangled')
                message = 'you tangled in twine net hidden in the shallows'
            }
        } else {
            if ( this.current_map_terrain.includes('mountain2') && map_terrain.includes('mountain1') && this.action_points >= 30 && dist < 1.5 ) {
                [this.x, this.y] = [x_grid, y_grid]
                this.action_points -= 30
                message = 'fell down mountain2 to mountain1'
                random() <= Game_state.break_leg_change_down_m2 && this.give_buff('broken_leg')
            }
            else if ( this.current_map_terrain.includes('mountain1') && ['dirt', 'water'].includes(map_terrain) && this.action_points >= 20 && dist < 1.5 ) {
                [this.x, this.y] = [x_grid, y_grid]
                this.action_points -= 20
                this.current_map_terrain = game_state.environment[this.y][this.x]
                message = 'fell down mountain1 to ground level'
                random() <= Game_state.break_leg_change_down_m1 && this.give_buff('broken_leg')
            }
            else {
                message = 'can\'t move there, press t to pick up'
                return
            }
        }
        this.current_map_terrain = game_state.environment[this.y][this.x]
        
    }

    dist_from_object = objects => {
        var min_dist = Infinity

        for ( let object of objects ) {
            let dist = math.distance( [object.x, object.y], [this.x, this.y] )
            if ( dist < min_dist ) min_dist = dist
        }
        return min_dist
    }

    dist_from_bases = () => {
        return this.dist_from_object(this.bases)
    }

    dist_from_workbenches = () => {
        return this.dist_from_object(this.workbenches)
    }

    dist_from_cauldrons = () => {
        return this.dist_from_object(this.cauldrons)
    }

    dist_from_drafters = () => {
        return this.dist_from_object(this.drafters)
    }

    hammock_sleep = () => {
        let next_to_hammock = false

        Game_state.aoe((sel, _, 一) => {
            if ( sel.includes('hammock') ) {
                next_to_hammock = true
            }
        }, [this.x, this.y], 1)

        if ( next_to_hammock ) {
            let values = Game_state.items_states['hammock']
            this.heal(values['heal'], 'rest')
            this.action_points = min(50, this.action_points + values['action_point_gain'])
        }
    }

    craft_states = item => {            //inter round crafting
        switch (item) {
            case 'fireball' : {
                this.items_states['fireball'].push({'round':0})
                break
            }
            case 'bomb' : {
                this.items_states['bomb'].push({'name': 'bomb', 'ticks':0, 'round': 0, 'position': [this.x, this.y], 'exploded': false})
                break
            }
            case 'crossbow': {
                this.items_states['crossbow'].push({'loaded': false})
            }
        }
    }

    craft = item => {
        if ( !this.doable('craft') ) {message = 'action disabled by player states'; return}

        let next_to_workbench = this.dist_from_workbenches() <=3
        let required_AcP = next_to_workbench ? 2 : 5

        this.action_points -= this.use_action_points(required_AcP, 'craft')

        let de_copy_item = item.split('_')[0]   //'plank_1' => plank
        let all_craftable_items = Object.assign({}, Game_state.all_craftable_items)
        let item_recipe = all_craftable_items[item]
        let add_amount = de_copy_item == 'sharprock' ? getRandomInt(2) : (item_recipe['add_amount']) ? item_recipe['add_amount'] : 1 
        de_copy_item == 'sharprock' && add_amount == 0 && ((message='You made smooth rock, git gud'), add_amount = 1, item = 'pebble')

        let rounds_till_craft = Object.keys(Game_state.craftable_items_bench).includes(item) ? 1 : Object.keys(Game_state.craftable_items_cauldron).includes(item) ? item_recipe['round'] : 0
        
        
        rounds_till_craft != 0 ? (this.round_events.push({'event': 'craft', 'item': de_copy_item, 'round': rounds_till_craft, 'amount': add_amount}), message = 'Cued for Crafting') : this.add_item(de_copy_item, add_amount)

        for ( let [material, amount] of Object.entries(item_recipe) ) {
            if ( material == 'torch' && de_copy_item != 'beacon' ) continue
            if ( material == 'round' ) continue
            if ( material == 'add_amount' ) continue

            if ( amount.constructor == Object ) {       
                if ( material == 'bottle' ) {               //'bottle': {'poison': 1}
                    let liquid = Object.keys(amount)[0]     // 'poison'
                    let needed_amount = amount[liquid]      //  1

                    this.check_liquid(liquid, needed_amount, true)
                    continue
                } 
            }
            this.subtract_item(material, amount)            
        }

    }

    aoe = (callback, pos, radius) => {
        for (let y = -radius; y<=radius; y++) {
            for (let x = -radius; x<=radius; x++) {
                if ( pos[0] + x >= width || pos[1] + y >= height || pos[0] + x < 0 || pos[1] + y < 0  ) continue

                math.distance([0, 0], [x, y]) <= radius && callback(this.evaluate_selection([pos[0]+x, pos[1]+y]), math.distance([0, 0], [x, y]), [pos[0]+x, pos[1]+y])
            }
        }
    }

    same_level = terrain => {
        let my_level;
        let level;

        my_level = Game_state.get_level(this.current_map_terrain)
        level = Game_state.get_level(terrain)

        return my_level == level
    }

    use = item => {
        if ( !this.doable('use') ) {message = 'action disabled by player states'; return}

        var [selection_x, selection_y] = this.selection ?? ''
        if ( typeof selection_x != 'number' ||  typeof selection_y != 'number' ) { message = 'select a location on the map'; return }
        var dist_from_selection = math.distance( [this.x, this.y], [selection_x, selection_y] )
        let damage_mult = 1 / ( 1+dist_from_selection/5 )

        this.evaluate_selection()
        //elliminate array and take top layer
        if ( this.selection.constructor == Array ) { this.selection = this.selection[this.selection.length-1] }

        //random values
        let states = Game_state.items_states
        var values = states[item]

        var sel_terrain = game_state.environment[selection_y][selection_x]  

        var hit_enemy = false

        var AcP = values && values['action_points']

        /////////////////////////////////////////////////////////////////////////////action points breaking already done in gui

        //top layer is object
        if ( this.selection.constructor == Object ) {
            if ( this.selection.name == 'sapling' ) {
                if ( item == 'bottle' ) {
                    this.check_liquid('water', 1, true) ? (this.selection.watered = true, message = 'watered sapling' ) : (message = 'need to refill bottle with water')
                }
            }
            else if ( this.selection.name == 'cauldron' ) {
                if ( item == 'bottle' ) {
                    this.check_liquid('water', 1, true) ? ( this.place_in_object('water', this.selection), message = 'fill cauldron with water' ) : (message = 'bottles empty',
                    this.check_liquid('poison', 1, true) ? ( this.place_in_object('poison', this.selection), message = 'fill cauldron with poison' ) : (message = 'bottles empty') )
                }
            }
            else if ( this.selection.name == 'condenser' && this.selection.items.length != 0 ) {
                if ( item == 'bottle' ) {
                    this.items_states['bottle'].push({'holding': 'water'})
                    this.selection.items.shift()
                }
            }
            else if ( Object.keys(Game_state.animals).includes(this.selection['name']) ) {  //is animal
                var animal = this.selection

                if ( ['fist', 'axe', 'dagger', 'battleaxe', 'pike', 'shiv', 'ironaxe'].includes(item) && !Game_state.flying_animals.includes(animal.name) ) {
                    let range = Game_state.items_states[item]['max_range'] ?? 2

                    this.same_level(sel_terrain) ? dist_from_selection < range ? (animal.health -= values['attackanimal']??values['attack'], this.use_durability(item, values['dursubene']??1, hit_enemy = true), this.action_points -= this.use_action_points(AcP, 'use'), message = 'Hit mob') : message = 'too far away' : message = 'Terrain Level Variance'

                    if ( animal.health <= 0 ) {
                        game_state.kill_animal(animal, this)
                    }

                    if ( hit_enemy ) {}

                } 
                else {
                    if ( item == 'lasso' ) {
                        if ( Game_state.lassoable_animals.includes(animal.name) ) {
                            animal.lassoed = !animal.lassoed
                            message = `${animal.lassoed?'':'un'}lassoed ${animal.name}`
                        }
                    }
                    else if ( item == 'bucket' && (animal.name == 'cow' || animal.name == 'goat') ) {
                        this.add_item('milkbucket')
                    }
                    else if ( item == 'wheat' && Game_state.feed_by_wheat_animals.includes(animal.name) ) {
                        animal.fed = true
                        message = `Fed ${animal.name}`
                        this.subtract_item('wheat')
                    }
                    else if ( item == 'banana' && Game_state.feed_by_banana_animals.includes(animal.name) ) {
                        animal.fed = true
                        message = `Fed ${animal.name}`
                        animal.health = min(Game_state.animals[animal.name]['health'], animal.health + Game_state.items_states['banana']['heal_animal'])
                        this.subtract_item('banana')
                    }
                    else if ( item == 'grain' && Game_state.feed_by_grain_animals.includes(animal.name) ) {
                        animal.fed = true
                        message = `Fed ${animal.name}`
                        animal.health = min(Game_state.animals[animal.name]['health'], animal.health + Game_state.items_states['grain']['heal_animal'])
                        this.subtract_item('grain')
                    }
                    else if ( item == 'mineralpill' && Game_state.pillable_animals.includes(animal.name) ) {
                        animal.pilled = true
                        message = `Pilled ${animal.name}`
                        this.subtract_item('mineralpill')
                    }
                    else 
                    message = 'can\'t use this to hit animal'
                }
            }


            if ( dist_from_selection < 1.5 ) 

            switch (item) {
                case 'climbinggear' : {
                    if ( this.selection.name.includes('wall') && this.selection.name!='ironwall' ) {
                        
                        if ( this.some_effect(['fat', 'encumbered', 'broken_leg', 'broken_arm']) ) {message = 'Player Disabled by Effects'; break}
                        this.action_points -= AcP, this.x = selection_x, this.y = selection_y, this.use_durability('climbinggear', values['dursubwall'])
                        break
                    }
                    break
                }
                case 'fist' : {                                    /////////////////////////////////////////////////////////////////////////////
                    if ( !this.same_level(sel_terrain) ) {message = 'Terrain Level Variance'; break}
                    if ( this.some_effect(['broken_arm']) ) {message = 'Player Disabled by Effects'; break}

                    //if poison on selection
                    if ( sel_terrain.constructor==Array && sel_terrain.includes('poison') ) this.give_buff('poison') 

                    if ( this.selection.name.includes('wall') ) {
                        game_state.heal_object(this.selection, values['attackwall'], 'bludgen', this, [selection_x, selection_y])
                        this.action_points -= AcP, this.heal(-values['health'+this.selection['health']], 'hit') 
                        break
                    }

                    if ( this.selection == 'coral1' || this.selection == 'coral2' ) {
                        !this.items['glove'] && this.heal(values['coraldamagechance']), this.action_points -= AcP
                        let items = [] 
                        Game_state.items_states[this.selection]['items'].forEach(item=>{for (let i=0;i<item[1];i++) items.push(item[0])}) //[['shard', 10], ['sponge', 2]]

                        random() < values['getitemfromcoral'] && this.add_item(random(items))
                    }
                    break
                }
                
            }
            else message = 'Too Far Away!'
        }

        //random values :
        var enemydist = math.distance( [this.x, this.y], [this.enemy.x, this.enemy.y] )
        let range_mult = this.current_map_terrain.includes('mountain1') ? Game_state.mountain1_range_mult : this.current_map_terrain.includes('mountain2') ? Game_state.mountain1_range_mult : 1
        
        if ( this.selection.name == 'base' ) {               ////////////////////////////////////////
            let base = this.selection
            let basedist = math.distance([base.x, base.y], [this.x, this.y])

            if ( ['fist', 'shovel', 'axe', 'dagger', 'shiv'].includes(item) ) {                 //too thick
                message = 'Can\'t hit base, base too thick'
            } else if ( ['pike', 'pickaxe', 'warhammer'].includes(item) ) {
                if ( !this.same_level(sel_terrain) ) {message = 'Terrain Level Variance'}
                else if ( this.some_effect(['broken_arm']) ) {message = 'Player Disabled by Effects'}
                else {
                    basedist < 2 ? (base.damage(values['max_damage']??values['attack']), this.action_points -= AcP, this.use_durability(item, values['dursubbase']??1)) : message = 'too far away' 
                }
            }
            else 
            switch (item) {

            }
        }

        switch (this.selection) {
            case 'player' : {
                if ( Game_state.ropecutters.includes(item) && this.player_effects['tangled'] ) {
                    this.player_effects['tangled'] = {}
                }
                if ( Game_state.foods.includes(item) ) {
                    this.eat_food(item)
                }
                switch (item) {
                    case 'bottle' : {
                        this.check_liquid( 'water', 1, true ) && this.player_states['burning']['ticks'] != undefined && (this.player_states['burning'] = {}, message = 'successfully doused urself')
                        break
                    }
                    case 'rudimentaryheal': {
                        this.heal(values['heal'], 'medicine')
                        this.subtract_item('rudimentaryheal')
                        break
                    }
                    case 'bandage': {
                        this.round_events.push({'event': 'bandage', 'round': 1})
                        this.heal(values['heal'], 'medicine')
                        this.subtract_item('bandage')
                        break
                    }
                    case 'medicine': {
                        this.player_states['sickness'] = {}
                        this.subtract_item('medicine')
                        this.heal(values['heal'], 'medicine')
                        break
                    }
                    case 'arrow': {
                        this.items_states['crossbow'].some(state => {
                            if ( !state['loaded'] ) {state['loaded'] = true; this.subtract_item('arrow', 1); true}
                        })
                        break
                    }
                    case 'antipoisonmix': {
                        this.player_states['poison'] = {}
                        break
                    }
                    case 'buffmix': {
                        this.give_buff('buff')
                        break
                    }
                    case 'actionmix': {
                        this.action_points += Game_state.items_states['actionmix']['action_point_gain']
                        break
                    }
                }
                break
            }
            case 'enemy' : { ///////////////////////////////////
                message = 'attemping attacking'
                
                this.action_points -= isNaN(AcP)?0:AcP

                if ( ['fist', 'shovel', 'pickaxe', 'axe', 'dagger', 'battleaxe', 'pike', 'shiv', 'ironaxe', 'ironpickaxe', 'ironshovel'].includes(item) ) {
                    this.same_level(sel_terrain) ? enemydist < 2 ? 
                    (this.enemy.heal(-values['attack'], 'sharp'), this.use_durability(item, values['dursubene']??1), message = 'Hit Enemy', hit_enemy=true,
                    this.enemy.items['thornsarmor'] && this.enemy.heal(states['thornsarmor']['attack'], 'sharp')) 
                    : message = 'too far away' : message = 'Terrain Level Variance'
                } 

                switch (item) {

                }

                break
            }
            case 'water': {
                if ( dist_from_selection >= 2 ) break
                switch (item) {
                    case 'bottle' : {
                        let bottle_value = {'holding': 'water'}
                        this.items_states['bottle'].length < this.items['bottle'] && ( this.items_states['bottle'].push(bottle_value), message = 'got bottle\'o water' )
                        break
                    }
                    case 'shovel' : 
                    case 'ironshovel' : {
                        if ( !this.same_level('water') ) {message = 'Terrain Level Variance'; break}

                        let probsand = Game_state.sand_chance
                        let probclay = Game_state.clay_chance

                        this.use_durability(item, 1)
                        this.action_points -= AcP
                        Math.random()<=probsand && this.add_item('sand', 1)
                        Math.random()<=probclay && this.add_item('clay', 1)
                        break
                    }
                    case 'sponge': {
                        this.action_points -= AcP
                        
                        this.selection.constructor == Array ? game_state.environment[selection_y][selection_x] = 'dirt' : game_state.environment[selection_y][selection_x].pop()
                        game_state.fix_terrain_dearray(selection_x, selection_y)
                        break
                    }
                    case 'fist': {
                        this.player_effects['dirty'] = false
                        break
                    }
                }
                break
            }
            case 'mysterypond' : {
                if ( dist_from_selection >= 2 ) break

                switch (item) {
                    case 'bottle' : {
                        let bottle_value = {'holding': 'poison'}
                        this.items_states['bottle'].length < this.items['bottle'] && ( this.items_states['bottle'].push(bottle_value), message = 'got bottle\'o death' )
                        break
                    }
                }
                break
            }
            case 'fire': {
                if ( dist_from_selection >= 2 ) break
                
                switch (item) {
                    case 'bottle' : {
                        this.check_liquid('water', 1, true) && game_state.environment[selection_y][selection_x].pop() 
                        break
                    }
                    case 'stick': {
                        this.add_item('torch')
                        break
                    }
                }
                break
            }
            case 'dirt': {  ///////////////////////////////////
                switch (item) {
                    case 'shovel' :              ///////////////////////////
                    case 'ironshove': {
                        if ( !this.same_level('dirt') ) {message = 'Terrain Level Variance'; break}
                        if ( this.some_effect(['broken_arm']) ) {message = 'Player Disabled by Effects'; break}
                        if ( dist_from_selection >= 2 || this.some_effect(['broken_arm'])  ) break
                        
                        game_state.environment[selection_y][selection_x] = ['hole']

                        this.use_durability(item, 1)
                        this.add_item('dirt', values['harvestnodirt'])
                        this.action_points -= AcP
                        break
                    }
                    case 'hoe': {
                        if ( !this.same_level('dirt') ) {message = 'Terrain Level Variance'; break}
                        if ( this.some_effect(['broken_arm']) ) {message = 'Player Disabled by Effects'; break}
                        if ( dist_from_selection >= 2 || this.some_effect(['broken_arm'])  ) break

                        let garden = {'name': 'garden', 'items': [], 'watered': false, max:states['garden']['storage_capacity'], 'x': selection_x, 'y': selection_y}
                        game_state.environment[selection_y][selection_x] = ['dirt', garden]

                        this.use_durability('hoe', values['dursubgarden'])
                        this.action_points -= AcP
                        break
                    }
                }
                
                break
            }
            case 'mountain1' : {                 ///////////////////////////////////
                switch (item) {
                    case 'climbinggear' : { 
                        if ( this.some_effect(['fat', 'encumbered', 'broken_leg', 'broken_arm']) ) {message = 'Player Disabled by Effects'; break}

                        (dist_from_selection < 2 && this.current_map_terrain == 'mountain2' || this.current_map_terrain != 'mountain1') &&
                        (this.action_points -= this.use_action_points(AcP, 'use'), this.x = selection_x, this.y = selection_y, this.use_durability('climbinggear', values['dursubm1'])) 
                        break
                    }
                    case 'pickaxe' : 
                    case 'ironpickaxe': {
                        if ( !this.same_level('dirt') && !this.same_level('mountain1') ) {message = 'Terrain Level Variance'; break}
                        if ( this.some_effect(['broken_arm']) ) {message = 'Player Disabled by Effects'; break}

                        dist_from_selection < 2 && ( this.use_durability('pickaxe', values['dursubwall']), this.action_points -= this.use_action_points(AcP, 'use'), this.add_item( 'rock', values['harvestno'] ), 
                        game_state.environment[selection_y][selection_x] = 'dirt', Math.random()<=Game_state.ironore_chance && this.add_item('ironore', 1) )
                        break
                    }
                }
                break
            }
            case 'mountain2' : {               ///////////////////////////////////
                switch (item) {
                    case 'climbinggear' : {
                        if ( this.some_effect(['fat', 'encumbered', 'broken_leg', 'broken_arm']) ) {message = 'Player Disabled by Effects'; break}

                        this.current_map_terrain == 'mountain1' && dist_from_selection < 2 &&
                        (this.use_durability('climbinggear', values['dursubm2']), this.action_points -= this.use_action_points(AcP, 'use'), this.x = selection_x, this.y = selection_y)
                        break
                    }
                    case 'pickaxe' : {
                        if ( !this.same_level('mountain1') && !this.same_level('mountain2') ) {message = 'Terrain Level Variance'; break}
                        if ( this.some_effect(['broken_arm']) ) {message = 'Player Disabled by Effects'; break}

                        dist_from_selection < 2 && ( this.action_points -= this.use_action_points(AcP, 'use'), this.add_item('rock', values['harvestno']),
                        this.use_durability('pickaxe', values['dursubwall']), game_state.environment[selection_y][selection_x] = ['mountain1'],
                        Math.random()<=Game_state.ironore_chance*1.5 && this.add_item('ironore', 1) )
                        break
                    }
                    case 'ironshovel' :
                    case 'shovel' : {
                        if ( !this.same_level('mountain2') ) {message = 'Terrain Level Variance'; break}
                        if ( this.some_effect(['broken_arm']) ) {message = 'Player Disabled by Effects'; break}

                        dist_from_selection < 2 && this.current_map_terrain.includes('mountain2') &&
                        (this.action_points -= this.use_action_points(AcP, 'use'), this.use_durability(item, 1), this.add_item('snow', shovel_values['harvestno'])) 
                        break
                    }
                }
                break
            }  
            case 'stick': {
                if ( item == 'stick' || item == 'firestarter' ) {
                    let acp = values['fire_action_points']
                    if ( this.action_points < this.use_action_points(acp, 'use') ) {message = 'Creating Fire; not enough acp'; break}

                    this.action_points -= this.use_action_points(acp, 'use')

                    random() < values['make_fire_chance'] && this.add_item('torch')
                }
                break
            }
            case 'mud': {
                if ( sel_terrainl.includes('water') ) {
                    this.add_item('mud', 3)
                }
                else {
                    this.add_item('mud', 1)
                } 
                this.action_points -= this.use_action_points(acp, 'use')
                this.use_durability(item, 1)

                break
            }
        }

        if ( (item=='scythe'||item=='dagger'||item=='fist') && this.same_level(sel_terrain[0]) ) {
            if ( this.selection == 'grass' ) {
                let seed_selection = Game_state.items_states['grass'][item]

                if ( item=='fist' ) {
                    if ( !this.action_points < this.use_action_points(values['get_seed_action_points'], 'use') ) {
                        this.action_points = this.action_points-this.use_action_points(values['get_seed_action_points'], 'use')
                        random() < values['get_seed_chance'] && this.add_item(random(seed_selection))
                    }
                } else {
                    for (let i=0; i<(item == 'scythe'?4:1); i++) {
                        this.add_item(random(seed_selection))
                    }
                    this.action_points = this.action_points-this.use_action_points(AcP, 'use')
                    this.use_durability(item, values['dursubgrass']??1)
                    game_state.environment[selection_y][selection_x].pop()
                }
                game_state.fix_terrain_dearray(selection_x, selection_y)
            }
        }
        else if ( this.selection.name == 'edenbush' && item=='scythe' && this.same_level(sel_terrain[0]) ) {
            game_state.environment[selection_y][selection_x].pop()
            this.add_item('edenbush', ceil(this.selection.rounds/5))
        }
        

        var sel_top = this.selection.name??this.selection

        if ( this.selection.name && this.selection.name.includes('wall') && ['dagger', 'shovel', 'hoe', 'ironhoe', 'ironshovel', 'fishingspear', ].includes(item) ) {
            message = 'can\'t use this on wall'
        }

        // using item on random
        switch (item) {
            case 'mudsmear': {
                if ( sel_top == 'brickwall' ) {
                    this.selection.health = min(this.selection.health + values['heal'])
                }
                break
            }
            case 'cementsmear': {
                if ( sel_top == 'cementwall' ) {
                    this.selection.health = min(this.selection.health + values['heal'])
                }
                break
            }
            case 'binocular': {
                if ( this.binocular_position.length != 0 ) {
                    this.binocular_position = []
                    break
                }
                let to_binocular = [selection_x-this.x, selection_y-this.y]
                let extended = [to_binocular[0] * values['extension'], to_binocular[1] * values['extension']]
                let over_border_x_ratio = max(abs(extended[0])/(extended[0]<0?this.x:width-this.x-1), 1)
                let over_border_y_ratio = max(abs(extended[1])/(extended[1]<0?this.y:height-this.y-1), 1)
                let max_normalization = max(over_border_x_ratio, over_border_y_ratio)
                let normalized = [extended[0] / max_normalization, extended[1] / max_normalization]

                this.binocular_position = [this.x + floor(normalized[0]), this.y + floor(normalized[1])]
                break
            }
            case 'climbinggear' : {              ///////////////////////////////////
                if ( this.some_effect(['fat', 'encumbered', 'broken_leg', 'broken_arm', 'tangled']) ) {message = 'Player Disabled by Effects'; break}

                ( this.current_map_terrain == 'mountain1' || this.current_map_terrain.includes('hole') || this.current_map_terrain.constructor == Array && this.current_map_terrain.some(obj=>{return obj.name == 'rockwall' || obj.name == 'brickwall' || obj.name == 'woodenwall'}) ) && ['water', 'dirt', 'darkland'].includes(this.selection) && dist_from_selection < 2 &&
                (this.use_durability('climbinggear', climbinggear_values['dursubm1']), this.action_points -= this.use_action_points(AcP, 'use'), this.x = selection_x, this.y = selection_y)
                
                break
            }
            case 'ladder' : {
                if ( this.some_effect(['fat', 'encumbered', 'broken_leg', 'broken_arm']) ) {message = 'Player Disabled by Effects'; break}
                
                ['water', 'dirt', 'darkland','mountain1', 'moutain2'].includes(this.selection) && dist_from_selection < 2 &&
                (this.action_points -= this.use_action_points(AcP, 'use'), this.x = selection_x, this.y = selection_y, this.subtract_item('ladder', 1) )
                
                break
            }
            case 'ironaxe' :
            case 'axe' : {
                if ( this.some_effect(['broken_arm']) ) {message = 'Player Disabled by Brocken arm'; break}
                
                let bottom_level = sel_terrain[0] == 'grass' ? 'dirt' : sel_terrain[0]
                
                if ( sel_terrain.includes('tree') && dist_from_selection < 2 && this.same_level(bottom_level) ) {
                    this.action_points -= this.use_action_points(AcP, 'use'), this.use_durability(item, values['dursubtree']), Game_state.items_states['tree']['drop'].forEach(drop=>{this.add_item(drop[0], drop[1])})
                    game_state.environment[selection_y][selection_x].splice(sel_terrain.indexOf('tree'))
                    
                    Game_state.aoe((sel, _, 一) => {
                        if ( sel[sel.length-1].name == 'forestspirit' ) {
                            sel[sel.length-1].agro = true
                        }
                    }, [this.x, this.y], Game_state.animals['forestspirit']['see_range'])
                    
                    break
                } 
                if ( sel_terrain.includes('witheredwillow') && dist_from_selection < 2 && this.same_level(bottom_level) ) {
                    this.action_points -= this.use_action_points(AcP, 'use'), this.use_durability(item, values['dursubtree']), Game_state.items_states['witherwillow']['drop'].forEach(drop=>{this.add_item(drop[0], drop[1])})
                    game_state.environment[selection_y][selection_x].splice(sel_terrain.indexOf('witherwillow'))
                    
                    break
                }
                if ( this.selection.name == 'woodenwall' ) {
                    this.action_points -= this.use_action_points(AcP, 'use'), this.use_durability(item, values['dursubwall'])
                    game_state.heal_object(this.selection, -values['attackonwall'], 'sharp', this, [selection_x, selection_y])
                    
                    break
                }
                break
            }
            case 'pickaxe' :                             /////////////////////////////////////////////////////////////////////////////
            case 'ironpickaxe': {
                if ( !this.same_level(sel_terrain) ) {message = 'Terrain Level Variance'; break}
                if ( this.some_effect(['broken_arm']) ) {message = 'Player Disabled by Effects'; break}
                
                let AcP = this.use_action_points(AcP, 'use')
                
                if ( this.selection.name.includes('wall') ) {
                    if ( this.selection.name != 'woodenwall' ) {
                        message = 'can\'t pickaxe wooden wall'
                        break
                    }
                    game_state.heal_object(this.selection, -values['attackonwall'], 'sharp', this, [selection_x, selection_y])
                    this.action_points -= AcP
                    this.use_durability(item, values['dursubwall'])
                    break
                }
                if ( this.selection.name == 'mines' ) {
                    this.action_points -= AcP
                    this.use_durability(item, values[dursubmines])

                    for (let i=0;i<Game_state.items_states['mines']['oregeneration'];i++) {
                        this.selection.items.push({'name': 'ironore', 'round': 0})
                    }
                    break
                }
                break
            }
            case 'bottle' : {
                if ( sel_top == 'fridge' ) {
                    this.check_liquid('water', 1, true) && this.place_in_object('water', this.selection)
                    break
                } 
                else if ( sel_top == 'cementpowder' ) {
                    this.check_liquid('water', 1, true) && (game_state.environment[selection_y][selection_x] = ['dirt'], this.add_item('wetcement'))
                    break
                }
                else if ( sel_top == 'campfire' ) {
                    this.check_liquid('water', 1, true) && (game_state.environment[selection_y][selection_x] = ['dirt'], 'charcoal')
                    break
                }
                ['darkland', 'moutain1', 'mountain2', 'dirt'].includes(this.selection) && this.selection.name != 'cauldron' && this.items_states['bottle'].length &&
                ( this.items_states['bottle'].shift(), (message = 'Poured liquid') )
        
                break
            }
            case 'poisondrip' : {
                ['rockwall', 'brickwall', 'woodenwall', 'cementwall', 'leaf', 'stick', 'rock'].includes(this.selection.constructor==Object?this.selection.name:this.selection) && !game_state.environment[selection_y][selection_x].includes('poison') && dist_from_selection < 2 &&
                (this.subtract_item('poisondrip', 1), true) && ( game_state.environment[selection_y][selection_x].constructor == Array ? game_state.environment[selection_y][selection_x].splice(game_state.environment[selection_y][selection_x].length-1, 0, 'poison') :
                game_state.environment[selection_y][selection_x] = ['poison', game_state.environment[selection_y][selection_x]] )
                
                break
            }
            case 'warhammer': {
                this.action_points -= this.use_action_points(AcP, 'use')
                
                Game_state.aoe((sel, dist) => {
                    let dist_mult = (values['radius']-dist)/values['radius']
                    let object = sel[sel.length-1] == 'enemy' ? this.enemy : sel[sel.length-1]
                    
                    if ( typeof object.constructor == 'object' ) {
                        game_state.heal_object(object, -values['max_damage'] * dist_mult, dist<1.3?'bludgen':'spread', this, [selection_x, selection_y])
                    }
                }, [this.x, this.y], values['radius'])
                
                this.use_durability('warhammer', 1)
                
                break
            }
            case '古琴' : {
                this.action_points -= this.use_action_points(AcP, 'use')
                
                Game_state.aoe((sel, dist, _) => {
                    let dist_mult = (values['radius']-dist)/values['radius']
                    let object = sel == 'enemy' ? this.enemy : sel[sel.length-1]
                    
                    if ( typeof object == 'object' ) {
                        game_state.heal_object(object, -values['max_damage'] * dist_mult, 'spread', this, [selection_x, selection_y])
                        sel == 'enemy' && this.enemy.give_buff('daze')
                        Object.keys(Game_state.animals).includes(object.name) && game_state.give_buff_to_animal(object, 'stun')
                    }
                    
                }, [this.x, this.y], values['radius'])
                
                this.use_durability('古琴', 1)
                
                break
            }
            case 'machete' : {
                let to_selection = [selection_x-this.x, selection_y-this.y]
                let dash_level = Game_state.levels[Game_state.get_level( this.current_map_terrain )-1]
                let moveable_area = game_objects.spread(this.x, this.y, '', [], dist_from_selection, false, dash_level.concat('grass'), true)
                var moving_position =  greatest_dot([selection_x, selection_y], moveable_area, to_selection).position
                
                Game_state.aoe((sel, _, 一) => {
                    if ( sel == 'enemy' ) {
                        this.same_level(this.enemy.current_map_terrain) && (this.enemy.heal(-values['aoe_attack'], 'sharp'), message = 'hit enemy with aoe dash')
                    }
                    else if ( Object.keys(Game_state.animals).includes(sel[sel.length-1].name) ) {
                        debugger
                        this.same_level(sel) && game_state.heal_animal(sel[sel.length-1], -values['aoe_attack'], 'sharp', this)
                    }
                }, moving_position, values['radius'])
                
                this.action_points -= this.use_action_points(values['dash_action_point_ratio']*dist_from_selection, 'move')
                this.use_durability('machete', 1)
                this.displace(...moving_position)
                
                break
            }
            case 'chain': {
                if ( dist_from_selection > values['max_range'] ) break
                
                let obj_to_player = [this.x-selection_x, this.y-selection_y]
                let magitude = dist_from_selection / values['max_range'] * 5
                
                let obj_level = Game_state.levels[Game_state.get_level( sel_terrain )-1]
                let moveable_area = game_objects.spread(selection_x, selection_y, '', [], magitude, false, obj_level.concat('grass'), true)
                var moving_position =  greatest_dot([selection_x, selection_y], moveable_area, obj_to_player)
                let chained_object = sel_top == 'enemy' ? this.enemy : Object.keys(Game_state.animals).includes(sel_top) && this.selection
                let stun_duration = values['affliction_duration']
                
                game_state.apply_buff_to_object(chained_object, 'stun', stun_duration)
                if ( sel_top == 'enemy' ) {
                    [this.enemy.x, this.enemy.y] = moving_position.position
                    this.enemy.current_map_terrain = game_state.environment[this.enemy.y][this.enemy.x]
                    break
                }
                else if ( Object.keys(Game_state.animals).includes(sel_top) ) {
                    let animal = this.selection
                    
                    game_state.displace_environment(animal)
                    animal.pos = moving_position.position 
                    let [newx, newy] = animal.pos
                    game_state.environment[newy][newx].constructor == Array ? game_state.environment[newy][newx].push(animal) : game_state.environment[newy][newx] = [game_state.environment[newy][newx], animal]
                }
                if ( ['enemy'].concat(Object.keys(Game_state.animals)).includes(sel_top) ) {
                    message = `${sel_top} hit with chain`
                    game_state.heal_object(this.selection, -values['attack'] * damage_mult, 'bludgen', this)
                }
                
                this.use_durability('chain', 1)
                
                break
            }
            case 'bow' : {
                if ( !this.items['arrow'] ) { message = 'no more arrows'; break }   //differnt arrows
                
                this.subtract_item('arrow', 1)   ////////////////////////////////////////dif arrow
                update_changed_position_alert(sel_terrain, selection_x, selection_y, this)
                message = 'shot bow'
                
                if ( typeof this.selection == 'object' ) {
                    dist_from_selection < bow_values['max_range'] * range_mult ? ( this.use_durability('bow', 1), Math.random() < 1 - ( dist_from_selection / values['max_range'] / range_mult ) ? (game_state.heal_object(this.selection, -values['attack'], 'sharp', this), message = 'Shot landed', hit_enemy=true) : message = 'miss') : message = 'too far away' 
                }
                
                break
            }
            case 'crossbow': {
                if ( !this.items_states['crossbow'].some(state=>{return state['loaded']}) ) { message = 'no crossbow loaded with arrows, must manually load'; break}
                
                this.items_states['crossbow'].some(state=>{return state['loaded'] && (state['loaded']=false, true)})
                update_changed_position_alert(sel_terrain, selection_x, selection_y, this)
                message = 'shot crossbow'
                
                if ( typeof this.selection == 'object' ) {
                    dist_from_selection < values['max_range'] * range_mult ? ( this.use_durability('bow', 1), Math.random() < 1 - ( dist_from_selection / values['max_range'] / range_mult ) ? (game_state.heal_object(this.selection, -values['attack'], 'sharp', this, [selection_x, selection_y]), message = 'Shot landed', hit_enemy=true) : message = 'miss' ) : message = 'too far away' 
                }
                
                break
            }
            case 'fisingspear': {
                this.action_points -= this.use_action_points(AcP, 'use')
                
                Game_state.aoe((sel, dist, _) => {
                    let object = sel[sel.length-1] == 'enemy' ? this.enemy : sel[sel.length-1]
                    
                    if ( typeof object.constructor == 'object' ) {
                        game_state.heal_object(object, -values['max_damage'], 'sharp', this, [selection_x, selection_y])
                    }
                }, [this.x, this.y], 1)
                
                this.use_durability('fisingspear', 1)
                
                break
            }
            case 'shiv': {
                if ( hit_enemy ) {
                    this.give_buff('shiv_speed')
                }
                
                break
            }
            case 'growthmix': {
                if ( this.selection.name == 'garden' || this.selection.name == 'greenhouse'  ) {
                    this.selection.items.forEach(plant => {
                        plant['round'] += values['speeduprounds']
                    })
                } else if ( this.selection.includes('edentree') ) {
                    Game_state.aoe((sel, dist, pos) => {
                        if ( sel[0] != 'dirt' && sel[1] != 'grass' && sel.length != 2 ) return

                        edenbush = {'name': 'edenbush', 'round': 0}

                        if ( random() < Game_state.items_states['edentree']['bushchance'] ) {
                            game_state.environment[pos[1]][pos[0]] = ['dirt', 'grass', edenbush]
                        }
                    })
                }
                break
            }
            case 'sundial': {
                if ( game_state.day ) message = `${game_state.rounds_till_daynight} days till dark`
                break
            }
            case 'floodbucket': {
                Game_state.aoe((sel, _, pos) => {
                    if ( sel.includes('hole') ) {
                        sel.includes('darkland') ? game_state.environment[pos[1]][pos[0]] = ['darkland', 'water'] : game_state.environment[pos[1]][pos[0]] = 'water'
                    }
                }, [selection_x, selection_y], Game_state.items_states['floodbucket']['radius'])
                break
            }
        }
        this.current_map_terrain = game_state.environment[this.y][this.x]
        this.selection = [selection_x, selection_y]
    }
    
    place_in_object = (item, sel) => {                    //in like campfire or smelter or chest
        let O = {'name': item, 'round': 0}
        
        sel['items'].push(O)
        item != 'water' && this.subtract_item(item, 1)
    }
    
    place = item => { //throw
        if ( !this.doable('place') ) {message = 'action disabled by player states'; return}
        if ( this.selection == undefined ) { message = `select something ${this.name}`; return }
        let [x, y] = this.selection
        if ( typeof x != 'number' ||  typeof y != 'number' ) { message = 'select a location on the map'; return }
        
        ///////////////////////////////////////////////////////////////// change throw position
        let dist = math.distance( [x, y], [this.x, this.y] )
        let damage_mult = 1 / ( 1+dist/5 )
        let throw_radius = math.floor( dist/5 )             //max shift
        let [randxshift, randyshift] = [ round(random()**4 * throw_radius ) * (round(random())*2-1), round(random()**4 * throw_radius ) * (round(random())*2-1) ]
        var selection_x = x + randxshift, selection_y = y + randyshift
        selection_x = min( max( selection_x, 0 ), width - 1 ), selection_y = min( max( selection_y, 0 ), height - 1 )
        this.selection = [selection_x, selection_y]
        
        this.evaluate_selection()   

        var selection_top = this.selection.constructor == Array ? this.selection[this.selection.length-1] : this.selection
        let is_placeable = Game_state.placeable_items.includes( item )
        this.subtract_item(item, 1) 

        if ( this.selection.includes('water') ) message = `${item} Thrown in water`

        var AcP_mult = Game_state.throwAC_mult
        let range_mult = this.current_map_terrain.includes('mountain1') ? Game_state.mountain1_range_mult : this.current_map_terrain.includes('mountain2') ? Game_state.mountain1_range_mult : 1
        var values = Game_state.items_states[item]

        if ( this.selection.name == 'base' ) {
            let base = this.selection
        }
        
        if ( this.selection.constructor == Array ) {
            if ( Object.keys(Game_state.animals).includes(this.selection[this.selection.length-1].name) ) {     //is animal

                switch (item) {

                }
            }

            if ( selection_top.name == 'campfire' ) {
                if ( Game_state.items_states['campfire']['fuel_values'].includes(item) ) {
                    selection_top.alight_ticks += Game_state.items_states['campfire']['fuel_values']['item']
                }
            }

            switch (item) {
                case 'stick' : {
                    if ( this.selection.includes('fire') ) {
                        this.subtract_item('stick', 1)
                        this.add_item('torch', 1)
                    }
                    break
                }
                case 'base' : {
                    if ( dist < 2 ) {message == 'too far'; break}
                    if (this.selection.includes('quary') ) {
                        let base = new Base(selection_x, selection_y, this, 'quary')
                        game_state.environment[selection_y][selection_x] = this.selection.includes('quary')?[ this.selection[0], 'quary', base ]:['quary', base ]
    
                        this.bases.push( base )
                        return
                    }
                    break
                }
            }

        } else 
        switch (this.selection) {
            case 'enemy' : {
                // message = 'attempting attacking'
                    
                switch (item) {

                }
                break
            }
            case 'dirt' : {                    
                switch (item) {
                    case 'pebble' : {
                        changed_positions.push([this.selection_x, this.selection_y, this])
                        break
                    }
                    case 'stair' : {
                        game_state.environment[selection_y][selection_x] = 'stair'
                        break
                    }
                    case 'mudpath': 
                    case 'stonepath': {
                        game_state.environment[selection_y][selection_x] = ['dirt', item]
                        break
                    }
                }      
                break
            }
            case 'water' : {
                switch (item) {
                    case 'dirt' : {
                        game_state.environment[selection_y][selection_x] = ['water', 'mud']
                        break
                    }
                    case 'bridge': {
                        game_state.environment[selection_y][selection_x] = ['water', 'bridge']
                        break
                    }
                    case 'lilypad': {
                        game_state.environment[selection_y][selection_x] = ['water', 'lilypad']
                        break
                    }
                }
                break
            }
            case 'stick' : {
                break
            }
            case 'rock' : {
                break
            }
            case 'leaf' : {
                break
            }
        }

        var landable_bottom = ['darkland', 'mountain1', 'mountain2', 'dirt', 'grass']
        var overwrite_terrain = ['stick', 'rock', 'leaf', 'grass']
        var placeable = this.selection.constructor != Array ? landable_bottom.concat(overwrite_terrain).includes(this.selection) : !landable_bottom.includes(this.selection[0]) ? false : this.selection.slice(1).every(t=>{return overwrite_terrain.includes(t)})
        var bottom_terrain = this.selection.constructor == Array ? this.selection[0] : 'dirt'
        var selection_top_name = selection_top.name??selection_top

        is_placeable && placeable && (game_state.environment[selection_y][selection_x].constructor == Array ? game_state.environment[selection_y][selection_x].push(item) : game_state.environment[selection_y][selection_x] = item)


        //place on random
        this.action_points -= this.use_action_points(dist*AcP_mult, 'throw')
        // changes positions alert
        update_changed_position_alert(this.selection, selection_x, selection_y, this)

        if ( ['base', 'workbench', 'smelter', 'campfire', 'beacon', 'chest', 'scarecrow', 'gate', 'composter', 'carcasscollector', 'trophy', 'treepot'].includes(item) && !placeable ) {message = 'Thrown in unlandable terrain'}
        else 
        switch (item) {
            case 'stunmix': {
                if ( ['enemy'].concat(Object.keys(Game_state.animals)).includes(selection_top_name) ) {
                    message = `${selection_top_name} hit with stunmix`
                    game_state.apply_buff_to_object(selection_top, 'stun')
                }
                break
            }
            case 'stunsplash': {
                Game_state.aoe((sel, 一, _) => {
                    let selection_top = sel == 'enemy' ? this.enemy : sel[sel.length-1]

                    if ( ['enemy'].concat(Object.keys(Game_state.animals)).includes(selection_top_name) ) {
                        message = `${selection_top_name} hit with stunsplash`
                        game_state.apply_buff_to_object(selection_top, 'stun')
                    } 
                }, [selection_x, selection_y], values['radius'])
                break
            }
            case 'poisonmix': {
                if ( ['enemy'].concat(Object.keys(Game_state.animals)).includes(selection_top_name) ) {
                    message = `${selection_top_name} hit with poisonmix`
                    game_state.apply_buff_to_object(selection_top, 'poison')
                }
                break
            }
            case 'poisonsplash': {
                Game_state.aoe((sel, 一, _) => {
                    let selection_top = sel == 'player' ? this : sel == 'enemy' ? this.enemy : sel[sel.length-1]

                    if ( ['enemy'].concat(Object.keys(Game_state.animals)).includes(selection_top_name) ) {
                        message = `${selection_top_name} hit with poisonsplash`
                        game_state.apply_buff_to_object(selection_top, 'poison')
                    } 
                }, [selection_x, selection_y], values['radius'])
                break
            }
            case 'weaknessmix': {
                if ( ['enemy'].concat(Object.keys(Game_state.animals)).includes(selection_top_name) ) {
                    message = `${selection_top_name} hit with weakness`
                    game_state.apply_buff_to_object(selection_top, 'weakness')
                }
                break
            }
            case 'weaknesssplash': {
                Game_state.aoe((sel, 一, _) => {
                    let selection_top = sel == 'enemy' ? this.enemy : sel[sel.length-1]

                    if ( ['enemy'].concat(Object.keys(Game_state.animals)).includes(selection_top_name) ) {
                        message = `${selection_top_name} hit with weakness`
                        game_state.apply_buff_to_object(selection_top, 'weakness')
                    }
                }, [selection_x, selection_y], values['radius'])
                break
            }
            case 'sightsplash': {
                Game_state.aoe((_, 一, pos) => {

                    this.magic_sight.push(pos)

                }, [selection_x, selection_y], values['radius'])

                break
            }
            case 'repellmix': {
                Game_state.aoe((sel, 一, pos) => {
                    if ( sel == 'base' ) return

                    let sel_top = sel == 'enemy' ? this.enemy : sel[sel.length-1]
                    if ( sel_top != this.enemy && !Object.keys(Game_state.animals).includes(sel_top.name) ) return
                    let [selx, sely] = sel_top == this.enemy ? [this.enemy.x, this.enemy.y] : sel_top.pos

                    let player_to_object = [selx-this.x, sely-this.y]
                    let magnitude_away = values['repelldist']
                    let obj_level = Game_state.levels[Game_state.get_level( sel == 'enemy' ? this.enemy.current_map_terrain : sel )-1]
                    let moveable_area = game_objects.spread(selection_x, selection_y, '', [], magnitude_away, false, obj_level.concat('grass'), true)
                    var moving_position =  greatest_dot([selection_x, selection_y], moveable_area, player_to_object)

                    if ( sel_top == this.enemy ) {
                        [this.enemy.x, this.enemy.y] = moving_position.position
                        this.enemy.current_map_terrain = game_state.environment[this.enemy.y][this.enemy.x]
                    } else if ( Object.keys(Game_state.animals).includes(sel_top.name) ) {
                        let animal = sel_top

                        game_state.displace_environment(animal)
                        animal.pos = moving_position.position 
                        let [newx, newy] = animal.pos
                        game_state.environment[newy][newx].constructor == Array ? game_state.environment[newy][newx].push(animal) : game_state.environment[newy][newx] = [game_state.environment[newy][newx], animal]
                    }


                }, [selection_x, selection_y], 2)

                break
            }
            case 'pebble': {
                if ( ['base', 'enemy'].concat(Object.keys(Game_state.animals)).includes(selection_top_name) ) {
                    message = `${selection_top_name} hit with pebble`
                    game_state.heal_object(selection_top, -values['attack'] * damage_mult, 'bludgen', this)
                }
                break
            }
            case 'snowball': {
                if ( ['enemy'].concat(Object.keys(Game_state.animals)).includes(selection_top_name) ) {
                    message = `${selection_top_name} hit with snowball`
                    game_state.heal_object(selection_top, -values['attack'] * damage_mult, 'bludgen', this)
                    game_state.apply_buff_to_object('freeze')
                }
                break
            }
            case '暗器': {
                if ( ['enemy'].concat(Object.keys(Game_state.animals)).includes(selection_top_name) ) {
                    message = `${selection_top_name} hit with 暗器`
                    game_state.heal_object(selection_top, -Game_state.items_states['暗器']['attack'] * damage_mult, 'sharp', this)
                    game_state.apply_buff_to_object(selection_top, 'bleeding')
                }
                break
            }
            case 'fireball': {
                if ( selection_top_name == 'enemy' ) {
                    this.enemy.give_buff('burning')
                    break
                }
                else if ( Object.keys(Game_state.animals).includes(selection_top_name) ) {
                    selection_top['states']['burning'] = {ticks: Game_state.general_states['burning']['ticks']}
                }
                else if ( selection_top_name = 'base' ) {
                    selection_top.give_buff('burning')
                }
            }
            case 'baselard': {
                if ( ['base', 'enemy'].concat(Object.keys(Game_state.animals)).includes(selection_top_name) ) {
                    message = `${selection_top_name} hit with baselard`
                    game_state.heal_object(selection_top, -values['attack'] * damage_mult, 'sharp', this)
                }
                if ( selection_top_name == 'enemy' ) {
                    this.enemy.give_buff('stun', values['affliction_duration'])
                    break
                }
                else if ( Object.keys(Game_state.animals).includes(selection_top_name) ) {
                    game_state.give_buff_to_animal(selection_top, 'stun', values['affliction_duration'])
                }

                break
            }
            case 'nettrap': {
                if ( this.selection.includes('hole') ) {
                    game_state.environment[selection_y][selection_x] = ['hole', 'nettrap']
                    break
                }    
                if ( !!placeable ) {message = 'Thrown in unlandable terrain'; break}
                game_state.environment[selection_y][selection_x] = [bottom_terrain, 'nettrap']
                break
            }
            case 'bait': 
            case 'largebait': 
            case 'dam': 
            case 'twinenet': {
                if ( !this.selection.includes('water') ) break

                this.selection.constructor == Array ? game_state.environment[selection_y][selection_x].push(item) : game_state.environment[selection_y][selection_x] = ['water', item]
                break
            }
            case 'leafcover': {
                if ( ! (this.selection.constructor == Array ? ['hole', 'landmine'].includes(this.selection[this.selection.length-1]) : ['hole', 'landmine'].includes(this.selection) ) ) break

                game_state.environment[selection_y][selection_x].push('leafcover')
                break
            }
            case 'scarecrow': {
                game_state.environment[selection_y][selection_x] = [bottom_terrain, 'scarecrow']  
                break
            }
            case 'base' : {
                let base = new Base(selection_x, selection_y, this)
                game_state.environment[selection_y][selection_x] = [bottom_terrain, base]  
                this.bases.push( base )
                break
            }
            case 'workbench': {
                let workbench = {'name': 'workbench', 'health': values['health'], 'parent': this, 'x': selection_x, 'y': selection_y}
                
                game_state.environment[selection_y][selection_x] = [bottom_terrain, workbench]  
                this.workbenches.push( workbench )
                break
            }
            case 'drafter': {
                let drafter = {'name': 'drafter', 'health': values['health'], 'items': [], 'parent': this, 'x': selection_x, 'y': selection_y}
                
                game_state.environment[selection_y][selection_x] = [bottom_terrain, drafter]  
                this.drafters.push( drafter )
                break
            }
            case 'condenser': {
                let condenser = {'name': 'condenser', 'health': 10, 'items': [], 'x': selection_x, 'y': selection_y, 'x': selection_x, 'y': selection_y}
                
                game_state.environment[selection_y][selection_x] = [bottom_terrain, condenser]  
                break
            }
            case 'cauldron': {
                let cauldron = {'name': 'cauldron', 'health': values['health'], 'items': [], max: values['storage_capacity'], 'parent': this, 'x': selection_x, 'y': selection_y}
                
                game_state.environment[selection_y][selection_x] = [bottom_terrain, cauldron]  
                this.cauldrons.push( cauldron )
                break
            }
            case 'smelter': {
                let smelter = {'name': 'smelter', 'items': [], 'health': values['health'], 'x': selection_x, 'y': selection_y, max: values['storage_capacity'], 'x': selection_x, 'y': selection_y}
                game_state.environment[selection_y][selection_x] = [bottom_terrain, smelter]  
                break
            }
            case 'chest': {
                let chest = {'name': 'chest', 'health': 10, 'x': selection_x, 'y': selection_y, 'items': [], max: values['storage_capacity'], 'x': selection_x, 'y': selection_y}
                
                game_state.environment[selection_y][selection_x] = [bottom_terrain, chest]  
                break
            }
            case 'campfire' : {
                let campfire = {'name': 'campfire', 'health': values['health'], 'items': [], max: values['storage_capacity'], 'alight_ticks': values['base_alight_ticks'], 'x': selection_x, 'y': selection_y}                            //object
                
                game_state.environment[selection_y][selection_x] = [bottom_terrain, campfire]  
                break
            }
            case 'gardenbed': {
                if ( selection_top_name != 'mountain1' || selection_top_name != 'mountain2' ) break

                let garden = {'name': 'garden', 'items': [], 'watered': false, max: states['garden']['storage_capacity'], 'x': selection_x, 'y': selection_y}

                game_state.environment[selection_y][selection_x] = [selection_top_name, garden]  
                break
            }
            case 'shelf' : {
                let shelf = {'name': 'shelf', 'health': values['health'], 'items': [], max: values['storage_capacity'], 'x': selection_x, 'y': selection_y}                            //object

                game_state.environment[selection_y][selection_x] = [bottom_terrain, shelf]  
                break
            }
            case 'fishfeeder': {
                if ( !this.selection.includes('water') ) {message = 'can only put in water'; break}

                let feeder = {'name': 'fishfeeder', 'items': [], max: values['storage_capacity'], 'x': selection_x, 'y': selection_y}                            //object

                bottom_terrain == 'darkland' ? game_state.environment[selection_y][selection_x] = ['darkland', 'water', feeder] : game_state.environment[selection_y][selection_x] = ['water', feeder]
                break
            }
            case 'carcasscollector': {
                let collector = {'name': 'carcasscollector', 'items': [], max: values['storage_capacity'], 'x': selection_x, 'y': selection_y}                            //object

                game_state.environment[selection_y][selection_x] = [bottom_terrain, collector]  
                break
            }
            case 'fridge' : {
                let fridge = {'name': 'fridge', 'health': values['health'], 'items': [], max: values['storage_capacity'], 'x': selection_x, 'y': selection_y}                            //object

                game_state.environment[selection_y][selection_x] = [bottom_terrain, fridge]  
                break
            }
            case 'composter': {
                let composter = {'name': 'composter', 'health': values['health'], 'items': [], max: values['storage_capacity'], 'rounds_composted_for': 0, 'x': selection_x, 'y': selection_y}

                game_state.environment[selection_y][selection_x] = [bottom_terrain, composter]  
                break
            }
            case 'beacon' : {
                let beacon = {'name': 'beacon', 'health': values['health'], 'power': false, 'x': selection_x, 'y': selection_y}                    //object

                game_state.environment[selection_y][selection_x] = [bottom_terrain, beacon]
                break
            }
            case 'fence' : {
                let fence = {'name': 'fence', 'health': values['health'], 'x': selection_x, 'y': selection_y}

                game_state.environment[selection_y][selection_x] = [bottom_terrain, fence]
                break
            }
            case 'scaffold': {
                if ( this.selection.constructor == Array ? this.selection.length == 1 && ['hole', 'mountain1', 'mountain2', 'darkland', 'cementfoundation', 'brickfoundation', 'orevein'].includes(selection_top_name): ['dirt', 'water'].includes(selection_top_name) ) {
                    let scaffold = {'name': 'scaffold', 'health': values['health'], 'items':[], 'x': selection_x, 'y': selection_y}

                    game_state.environment[selection_y][selection_x] = [selection_top_name, scaffold]
                } else message = `cannot set up scaffolding here on ${this.selection}`
                break
            }
            case 'minecart': {
                if ( selection_top_name=='scaffold' ) {
                    let scaffold = selection_top
                    
                    scaffold.items.push('minecart')

                    let materials = count(scaffold.items)

                    if ( (materials['woodenpillar'] >= 10 || materials['stonepillar'] >= 5) && materials['frame'] > 2 && this.selection[0] == 'orevein' ) {
                        let mines = {'name': 'mines', 'health': Game_state.items_states['mines']['health'], 'items': [], max: Game_state.items_states['mines']['storage_capacity'], 'x': selection_x, 'y': selection_y}
                       
                        game_state.environment[selection_y][selection_x] = ['mountain1', mines]
                    }
                    break
                }
                break
            }
            case 'ironwall': {
                if ( selection_top_name=='cementwall' ) {
                    let ironwall = {'name': 'ironwall', 'health': values['health'], 'x': selection_x, 'y': selection_y}

                    game_state.environment[selection_y][selection_x] = [this.selection[0], ironwall]
                }
                break
            }
            case 'fencegate': {
                let gate = {'name': 'fencegate', 'health': values['health'], 'parent': this, 'open': true, 'x': selection_x, 'y': selection_y}

                game_state.environment[selection_y][selection_x] = [bottom_terrain, gate]
                break
            }
            case 'gate': {
                let gate = {'name': gate, 'health': values['health'], 'parent': this, 'x': selection_x, 'y': selection_y}

                game_state.environment[selection_y][selection_x] = [bottom_terrain, gate]
                break
            }
            case 'glass': {
                if ( selection_top_name=='scaffold' ) {
                    let scaffold = selection_top
                    
                    scaffold.items.push('glass')

                    let materials = count(scaffold.items)

                    if ( materials['glass'] >= 2 && (materials['woodenpillar'] >= 2 || materials['stonepillar'] >= 2) ) {
                        let greenhouse = {'name': 'greenhouse', 'health': Game_state.items_states['greenhouse']['health'], 'items': [], max: Game_state.items_states['greenhouse']['storage_capacity'], 'x': selection_x, 'y': selection_y}
                       
                        game_state.environment[selection_y][selection_x] = [this.selection[0], greenhouse]
                    }
                    else if ( materials['glass'] >= 2 && materials['frame'] >= 2 ) {
                        let window = {'name': 'window', 'health': Game_state.items_states['window']['health'], 'x': selection_x, 'y': selection_y}
                       
                        game_state.environment[selection_y][selection_x] = [this.selection[0], window]
                    }
                    break
                }
                break
            }
            case 'wood': {
                if ( selection_top_name=='scaffold' ) {
                    let scaffold = selection_top
                    
                    scaffold.items.push('wood')

                    let materials = count(scaffold.items)

                    if ( materials['wood'] >= 6 && (materials['plank'] >= 4 || materials['brick'] >= 2 || materials['smoothstone'] >= 2) && materials['woodpillar'] >= 4 ) {
                        let lumbermill = {'name': 'lumbermill', 'health': Game_state.items_states['lumbermill']['health'], 'items': [], max: Game_state.items_states['lumbermill']['storage_capacity'], 'x': selection_x, 'y': selection_y}
                        
                        game_state.environment[selection_y][selection_x] = [this.selection[0], lumbermill]
                    }

                    break
                }
                if ( placeable ) {
                    game_state.environment[selection_y][selection_x] = [bottom_terrain, 'wood']
                    break
                }
                break
            }
            case 'frame': {
                if ( selection_top_name=='scaffold' ) {
                    let scaffold = selection_top
                    
                    scaffold.items.push('frame')
                }
                break
            }
            case 'plank': {
                if ( selection_top_name=='scaffold' ) {
                    let scaffold = selection_top
                    
                    scaffold.items.push('plank')

                    let materials = count(scaffold.items)

                    if ( materials['woodenpillar'] > 0 ) {
                        if ( materials['woodenpillar'] >= 2 && materials['plank'] >= 4 ) {
                            let tower = {'name': 'woodentower', 'health': Game_state.items_states['woodentower']['health'], 'x': selection_x, 'y': selection_y}
                            game_state.environment[selection_y][selection_x] = [this.selection[0], tower]
                            break
                        }
                    } else {
                        let wall = {'name': 'woodenwall', 'health': Game_state.items_states['woodenwall']['health'], 'x': selection_x, 'y': selection_y}
                        game_state.environment[selection_y][selection_x] = [this.selection[0], wall]
                    }
                    break
                }
                else if ( this.selection.includes('hole') ) {
                    game_state.environment[selection_y][selection_x] = ['hole', 'plank']
                    break
                }                                                       
                if ( !placeable ) {message = 'Thrown in unlandable terrain'; break}
                game_state.environment[selection_y][selection_x] = [bottom_terrain, 'plank']
                break
            }
            case 'woodenpillar': {
                if ( selection_top_name=='scaffold' ) {
                    let scaffold = selection_top
                    
                    scaffold.items.push('woodenpillar')

                    let materials = count(scaffold.items)

                    if ( materials['woodenpillar'] >= 2 && materials['plank'] >= 4 ) {
                        let tower = {'name': 'woodentower', 'health': Game_state.items_states['woodentower']['health'], 'x': selection_x, 'y': selection_y}
                        game_state.environment[selection_y][selection_x] = [this.selection[0], tower]
                    }
                    break
                }
                break
            }
            case 'stonepillar': {
                if ( selection_top_name=='scaffold' ) {
                    let scaffold = selection_top
                    
                    scaffold.items.push('stonepillar')

                    let materials = count(scaffold.items)

                    if ( materials['stonepillar'] >= 2 && materials['smoothstone'] >= 4 ) {
                        let health_mult = this.selection.includes('brickfoundation') ? .8 : this.selection.includes('cementfoundation') ? 1 : (this.selection.includes('mountain1')||this.selection.includes('mountain2')) ? .8 : .1
                        let tower = {'name': 'stonetower', 'health': Game_state.items_states['stonetower']['health'] * health_mult, 'x': selection_x, 'y': selection_y}

                        game_state.environment[selection_y][selection_x] = [this.selection[0], tower]
                    }
                    break
                }
                break
            }
            case 'smoothstone': {
                if ( selection_top_name=='scaffold' ) {
                    let scaffold = selection_top

                    scaffold.items.push('smoothstone')

                    let materials = count(scaffold.items)

                    if ( materials['smoothstone'] >= 2 && !materials['stonepillar'] ) {
                        let wall = {'name': 'rockwall', 'health': Game_state.items_states['rockwall']['health'], 'x': selection_x, 'y': selection_y}
                        game_state.environment[selection_y][selection_x] = [this.selection[0], wall]
                    } 
                    else if ( materials['stonepillar'] >= 2 && materials['smoothstone'] >= 4 ) {
                        let health_mult = this.selection.includes('brickfoundation') ? .8 : this.selection.includes('cementfoundation') ? 1 : (this.selection.includes('mountain1')||this.selection.includes('mountain2')) ? .8 : .1
                        let tower = {'name': 'stonetower', 'health': Game_state.items_states['stonetower']['health'] * health_mult, 'x': selection_x, 'y': selection_y}

                        game_state.environment[selection_y][selection_x] = [this.selection[0], tower]
                    }
                }
                break
            }
            case 'brick': {
                if ( selection_top_name=='scaffold' ) {
                    let scaffold = selection_top

                    scaffold.items.push('brick')

                    let materials = count(scaffold.items)

                    if ( materials['brick'] >= 2 ) {
                        let wall = {'name': 'brickwall', 'health': Game_state.items_states['brickwall']['health'], 'x': selection_x, 'y': selection_y}
                        game_state.environment[selection_y][selection_x] = [this.selection[0], wall]
                    } 
                    break
                }
                if ( selection_top_name == 'mountain1' || selection_top_name == 'mountain2' ) {
                    game_state.environment[selection_y][selection_x] = [selection_top_name, 'brickfoundation']
                    break
                }
                break
            }
            case 'wetcement': {
                if ( selection_top_name=='scaffold' ) {
                    let scaffold = selection_top

                    scaffold.items.push('wetcement')

                    let materials = count(scaffold.items)

                    if ( materials['wetcement'] >= 2 ) {
                        let wall = {'name': 'wetcementwall', 'health': Game_state.items_states['wetcementwall']['health'], 'x': selection_x, 'y': selection_y}
                        game_state.environment[selection_y][selection_x] = [this.selection[0], wall]
                    } 
                    break
                }
                if ( selection_top_name == 'hole' ) {
                    game_state.environment[selection_y][selection_x] = ['wetcementfoundation']
                    break
                }
                if ( selection_top_name == 'mountain1' || selection_top_name == 'mountain2' ) {
                    game_state.environment[selection_y][selection_x] = [selection_top_name, 'wetcementfoundation']
                    break
                }
                break
            }
            case 'sand': {
                if ( selection_top == 'dirt' ) {
                    game_state.environment[selection_y][selection_x] = ['dirt', 'sand']
                }
            }
            case 'ironore': {
                if ( selection_top == 'sand' ) {
                    game_state.environment[selection_y][selection_x] = ['dirt', 'cementpowder']
                }
                break
            }
            case 'brick': {
                if ( selection_top_name == 'hole' ) {
                    game_state.environment[selection_y][selection_x] = ['brickfoundation']
                    break
                }
                break
            }
            case 'treepot': {
                game_state.environment[selection_y][selection_x] = [bottom_terrain, 'treepot']
                break
            }
            case 'sapling': {
                if ( bottom_terrain != 'dirt' && selection_top_name != 'treepot' ) break

                let sapling = {'name': 'sapling', 'round': 0, 'watered': false, 'x': selection_x, 'y': selection_y}

                bottom_terrain == 'dirt' && (game_state.environment[selection_y][selection_x] = [bottom_terrain, sapling])
                selection_top_name == 'treepot' && (game_state.environment[selection_y][selection_x] = [bottom_terrain, 'treepot', sapling])
                break
            }
            case 'hammock': {
                if ( bottom_terrain != 'dirt' || selection_top_name == 'tree' ) break

                var trees_around = 0

                Game_state.aoe((sel, 一, _) => {
                    if ( sel.includes('tree') ) trees_around ++
                }, [selection_x, selection_y], 1)

                if ( trees_around >= 2 ) {
                    game_state.environment[selection_y][selection_x].push('hammock')
                }
                break
            }
            case 'trophy': {
                game_state.environment[selection_y][selection_x] = [bottom_terrain, 'trophy']
                break
            }
            case 'manuer' :
            case 'wheat' :
            case 'carrot' :
            case 'banana' :
            case 'meat' : {
                if ( placeable || selection_top == 'leafcover' || selection_top == 'hole' ) {
                    game_state.environment[selection_y][selection_x] = [bottom_terrain, item]
                }
                break
            }
            case 'bomb' : {
                var bomb_shortest_time = {'ticks': -1}
                for ( var bomb of this.items_states['bomb'] ) { bomb['ticks'] > bomb_shortest_time['ticks'] && (bomb_shortest_time = bomb) }
                
                delete bomb_shortest_time['ticks']
                if ( this.selection.includes('water') ) { this.items_states['bomb'].splice(this.items_states['bomb'].indexOf(bomb_shortest_time), 1); break }
                else if ( this.selection.includes('quary') ) { message = 'bomb fell into quary'; this.items_states['bomb'].splice(this.items_states['bomb'].indexOf(bomb_shortest_time), 1); break }
                
                bomb_shortest_time['position'] = [selection_x, selection_y]
                
                if ( this.selection.constructor == Array ) {
                    game_state.environment[selection_y][selection_x].splice(1, 0, bomb_shortest_time)
                }
                else {
                    game_state.environment[selection_y][selection_x] = ['dirt', bomb_shortest_time]
                }
                break
            }
            case 'snowbomb': {
                Game_state.aoe((sel, _, pos) => {
                    if ( sel.includes('water') ) {
                        sel.constructor==Array?game_state.environment[pos[1]][pos[0]][sel.indexOf('water')] = 'ice':game_state.environment[pos[1]][pos[0]] = ['ice']
                    }
                    else if ( Object.keys(Game_state.animals).includes(sel[sel.length-1]) ) {
                        game_state.give_buff_to_animal('freeze')
                    }
                    else if ( sel=='enemy' ) {
                        this.enemy.give_buff('freeze')
                    }
                    else if ( sel == 'player' ) {
                        this.give_buff('freeze')
                    }
                },[selection_x, selection_y], values['radius'])
                break
            }
            case 'landmine' : {
                if ( this.selection.includes('water') ) {message = 'landmine fell into water'; break}
                if ( this.selection.includes('quary') ) {message = 'landmine fell into quary'; break}

                if ( this.selection.constructor == Array ) {
                    game_state.environment[selection_y][selection_x].splice(1, 0, 'landmine')
                }
                else {
                    game_state.environment[selection_y][selection_x] = ['dirt', 'landmine']
                }
                game_state.landmines.push([selection_x, selection_y])
                break
            }
            case 'gasbomb' : {
                if ( this.selection.includes('mountain1') || this.selection.includes('mountain2') ) break
                else if ( this.selection.includes('darkland') ) {message = 'fell in darkland'; break}
                else if ( this.selection.includes('quary') ) { message = 'bomb fell into quary'; break}

                game_objects.gas(selection_x, selection_y)

                break
            }
        }
        this.selection.includes('water') && (message = 'Thrown in Water')

        this.selection = [selection_x, selection_y]

    }

    in_movement_area = ( [x, y] ) => {
        if (this.movement_area.some( coord => {
            return x == coord[0] && y == coord[1]
        })) return true
    }

    generate_movement_area = () => {
        if ( this.mapped ) return

        let game_map = game_state.environment 
        let start = [this.x, this.y]

        this.open_nodes = []
        this.closed_nodes = []
        this.movement_area = []
        this.mapped = false

        this.open_nodes.push( new Node( start ) )

        while ( this.open_nodes.length || this.mapped ) {

            // sort
            this.open_nodes.sort( ( node_a, node_b ) => { return node_b.g - node_a.g} )

            // get node
            var current_node = this.open_nodes.pop()
            this.closed_nodes.push( current_node )

            var [x, y] = current_node.position
            var closed_map_terrain = game_map[y][x]
            
            this.movement_area.push( [x, y] )

            var neighbouring_nodes = [ [x-1, y], [x-1, y+1], [x, y+1], [x+1, y+1], [x+1, y], [x+1, y-1], [x, y-1], [x-1, y-1] ]

            neighbouring_nodes.forEach(node_position => {

                //node already in closed
                if ( this.closed_nodes.some( node => { return node.equal( node_position ) } ) ) return


                var [node_x, node_y] = node_position

                //not in map boundary
                if ( !( node_x >= 0 && node_x < game_map[0].length && node_y >= 0 && node_y < game_map.length ) ) return

                let map_terrain = game_map[node_y][node_x]
                let CMT = this.current_map_terrain

                //additional g adding
                let add_g = 0;
                let I = t => {return map_terrain.includes(t)}
                I('fence') && (add_g += 10), I('fencegate') && (add_g += 15), I('mudpath') && (add_g += .2), I('stonepath') && (add_g -= .4), (map_terrain == 'water'||I('water')) && !I('bridge') &&!I('lilypad') && (this.items['raft'] ? (add_g = -1.3) : this.items['flippers'] ? (add_g += 1) : (add_g += 4)), !this.items['climbinggear'] ? ( I('mountain1') && (this.items['mountainboots'] ? (add_g += .5) : (add_g += 1.5)), I('mountain2') && (this.items['mountainboots'] ? (add_g += .5) : (add_g += 1.5)) ) : ( I('mountain1') && (add_g += .2) ), (I('darkland') && (add_g += .2) ), (map_terrain == 'stair' && closed_map_terrain!='stair' && (add_g += 4), map_terrain != 'stair' && closed_map_terrain == 'stair' && (add_g += 4))
                
                //hit wall
                let updown = (terrain1, terrain2) => {  //from  one terrain to other eg from stairs to mountain1 and from mountain1 back to stairs
                    let CMTincludet2 = CMT.constructor == Array ? CMT.map(t=>{return t.constructor==Object?t['name']:t}).includes(terrain2) : (CMT['name']??CMT == terrain2)
                    let ClMTincludet1 = closed_map_terrain.constructor == Array ? closed_map_terrain.map(t=>{return t.constructor==Object?t['name']:t}).includes(terrain1) : (closed_map_terrain['name']??closed_map_terrain == terrain1)
                    let MTincludet1 = map_terrain.constructor == Array ? map_terrain.map(t=>{return t.constructor==Object?t['name']:t}).includes(terrain1) : (map_terrain['name']??map_terrain == terrain1)
                    let MTincludet2 = map_terrain.constructor == Array ? map_terrain.map(t=>{return t['name']??t}).includes(terrain2) : (map_terrain['name']??map_terrain == terrain2)
                    
                    let up = !(CMTincludet2||ClMTincludet1) && MTincludet2  //closedMT from dirt to stair to mountain1
                    let down = CMTincludet2 && !( MTincludet2 || MTincludet1 )

                    return up || down
                }
                if ( !['base', 'fence', 'fencegate', 'stonepath', 'mudpath', 'fencegate', 'woodentower', 'stonetower', 'crimsonroot', 'gate', 'twinenet', 'ice', 'lilypad', 'garden', 'grass', 'plank', 'hole', 'dirt', 'water', 'stair', 'mountain1', 'mountain2', 'darkland', 'water', 'gas', 'rockwall', 'mudwall', 'bridge'].includes(map_terrain.constructor==Array?map_terrain[map_terrain.length-1]['name']??map_terrain[map_terrain.length-1]:map_terrain['name']??map_terrain)) return
                if ( CMT.constructor==Array && CMT.some(obj=>{return obj.name=='rockwall' || obj.name=='mudwall'}) && (map_terrain.constructor == Array ? !map_terrain.some(obj=>{return obj.name=='rockwall' || obj.name=='mudwall'}) : true) ) return
                if ( updown('stair', 'mountain1') || updown('stair', 'rockwall') || updown('stair', 'brickwall') || updown('mountain2', 'mountain2') ) return          
                if ( node_x == this.enemy.x && node_y == this.enemy.y ) return
                if ( CMT[0] == 'hole' && !(map_terrain[0] == 'hole' || CMT.includes('plank')) || CMT[0] != 'hole' && map_terrain[0] == 'hole' && !I('plank') ) return
                if ( map_terrain.constructor == Array && map_terrain.map(t=>{return t.name}).includes('gate') && map_terrain[map_terrain.map(t=>{return t.name}).indexOf('gate')].parent != this ) return
                if ( map_terrain.constructor == Array && map_terrain.map(t=>{return t.name}).includes('fencegate') && !map_terrain[map_terrain.map(t=>{return t.name}).indexOf('fencegate')].open ) return

                let neighbour_g = current_node.g + this.use_action_points(math.distance( node_position, current_node.position ), 'move') + add_g
                let dist_from_node = Math.round( math.distance( node_position, [this.x, this.y] ) )

                if ( dist_from_node > this.max_dist || neighbour_g > this.action_points) return

                //node in open with higher f
                if ( this.open_nodes.some( node => { 

                    if ( !node.equal( node_position ) ) return
                    if ( node.g > neighbour_g ) this.open_nodes.splice( this.open_nodes.indexOf( node ), 1 )
                    else return true

                } ) ) return

                let neighbour = new Node( node_position, current_node )
                neighbour.g = neighbour_g

                this.open_nodes.push( neighbour )
                
            })
        }
        this.mapped = true

    }

}