//copyright jacky kuang
//no distribution otherwise you are inbreach of federal law
class Game_state {
    static action_points_gain_per_turn = 10
    static hungerloss_per_tick =    .3
    static base_heal_per_tick =     .1
    static maximum_player_AC =      50
    static rounds_till_attackbase = 50
    static ACexp_mult =             .03 
    static throwAC_mult =           .5
    static mountain1_range_mult =   1.2
    static mountain2_range_mult =   1.2  //throw range
    static mountain1_see_mult =     1.4  //see from and to
    static mountain2_see_mult =     2.0 
    static tower_see_mult =         1.4 
    static landmine_radius =        5
    static sand_chance =            .4
    static clay_chance =            .3
    static ironore_chance =         .2
    static break_leg_change_down_m2 = .5
    static break_leg_change_down_m1 = .3
    static Events =                 ['winter', 'spring', 'bloodmoon', 'drought', 'rain', 'meteorshower']
    static event_values =           {'winter': {'relative_chance': 1, 'flood_water_spread_chance': .1, 'rounds_last': [20,30], 'passivemob_spawn_mult': .5, 'nonpassivemob_spawn_mult': .8, 'crop_grow_mult': .1, 'max_animal_mult': .5, 'tint': [50, 100, 255]}, 
                                    'spring': {'relative_chance': 1, 'grass_spread_chance': .1, 'tree_grow_chance': .01, 'rounds_last': [20,30],  'passivemob_spawn_mult': 1.3, 'nonpassivemob_spawn_mult': .7, 'crop_grow_mult': 1.5, 'max_animal_mult': 1.5, 'tint': [150, 255, 150]},
                                    'bloodmoon': {'relative_chance': 1, 'rounds_last': [20,30],  'passivemob_spawn_mult': .2, 'nonpassivemob_spawn_mult': 2, 'crop_grow_mult': 1.6, 'max_animal_mult': 3, 'tint': [255, 0, 0]},
                                    'drought': {'relative_chance': 1, 'rounds_last': [20,30],  'passivemob_spawn_mult': .4, 'nonpassivemob_spawn_mult': .9, 'crop_grow_mult': .5, 'max_animal_mult': .2, 'tint': [100, 67, 30]},
                                    'rain': {'relative_chance': 1, 'rounds_last': [20,30],  'passivemob_spawn_mult': 1.1, 'nonpassivemob_spawn_mult': .9, 'max_animal_mult': 1.3, 'tint': [20, 70, 255]},
                                    'meteorshower': {'relative_chance': 1, 'rounds_last': [1,3], 'tint': [128, 0, 32], 'explosion_chance': .0001, 'explosion_radius': 10, 'explosion_max_damage': 90}
                                    }
    static floodable_terrain =      ['stick', 'rock', 'leaf', 'hole', 'leafcover', 'plank', 'mushroom', 'tulip', 'garden', 'sapling', ]
    static environment_items =      ['stick', 'rock', 'leaf']  //remember to update these for environemnt 
    static forest_items =           ['stick', 'stick', 'stick', 'leaf', 'leaf', 'leaf', 'rock']
    static mountain_items =         ['stick', 'leaf', 'rock', 'rock', 'rock']
    static materials =              ['stick', 'rock', 'leaf', 'dirt', 'ironore', 'sand', 'snow', 'clay', 'wood']    
    static placeable_items =        ['stick', 'rock', 'leaf', 'mud', 'leafcover']
    static landable_terrain =       ['darkland', 'mountain1', 'mountain2', 'dirt', 'stick', 'rock', 'leaf', 'grass']
    static non_landable_terrain =   ['stick', 'leaf', 'rock']
    static burnable_items =         ['stick', 'leaf', 'shovel', 'pickaxe', 'axe', 'bow', 'arrow', 'ladder', 'leafcover', 'raft', 'plank', 'stair', 'poison']
    static burnable_terrain =       ['woodenwall', 'chest', 'fence', 'shelf', 'bridge', 'plank', 'tree', 'grass', 'stick', 'leaf', 'scaffold', 'woodentower']
    static investible_items =       ['stick', 'rock', 'leaf', 'dirt']
    //movement for animals
    static non_obstructing_terrain =['mudpath', 'stonepath', 'twinenet', 'composter', 'crimsonroot', 'bait', 'coral1', 'coral2', 'shell', 'lilypad', 'cattail', 'mussel', 'sapling', 'mushroom', 'tulip', 'garden', 'grass', 'darkland', 'smog', 'gas', 'nettrap', 'landmine', 'water', 'hole', 'leafcover', 'plank', 'quary', 'dirt', 'stick', 'leaf', 'mud', 'rock', 'darkland', 'bomb', 'fire', 'poison', 'spike']
    //not seethroughable
    static obstructing_terrain =    ['ironwall', 'mountain1', 'mountain2', 'rockwall', 'brickwall', 'base', 'tree', 'edentree', 'cementwall', 'brickwall', 'woodenwall', 'gate', 'woodentower', 'stonetower']
    static pseudo_m1_blockers =     ['rockwall', 'brickwall', 'base', 'tree', 'edentree', 'cementwall', 'wetcementwall', 'woodenwall', 'gate', 'fencegate', 'woodentower', 'stonetower']
    static pseudo_m2_blockers =     ['ironwall']
    static plus1_levelers =         ['woodentower', 'stonetower']     //cmt   
    static storing_objects =        ['campfire', 'smelter', 'base', 'chest', 'garden', 'shelf', 'fridge', 'cauldron', 'greenhouse', 'composter', 'mines', 'carcasscollector', 'fishfeeder']
    static round_update_storers =   ['campfire', 'garden', 'smelter', 'shelf', 'fridge', 'greenhouse', 'lumbermill', 'mines']
    static ropecutters =            ['dagger', 'axe', 'tecpatl', 'multiknife', 'scythe']
    static levels =                 [['hole'], ['dirt', 'darkland', 'water', 'ice'], ['stair', 'mountain1', 'rockwall', 'mudwall'], ['moutain2']]
    static move_animal_interval     = 100
    static day_animal_night_despawn_chance = .4
    static holeable_animals =       ['cow', 'lion', 'ravenger', 'babycow', 'ape', 'babyape']
    static twinenettable_animals =  ['fish',]
    static flying_animals =         ['shrieker', 'phantom', 'cinder']
    static darkland_sight_animals = ['doctor', 'enbalmer']
    static lassoable_animals =      ['cow', 'goat', 'shark', 'lion', 'babycow', 'babygoat', 'ape', 'babyape']
    static breedable_animals =      ['cow', 'goat', 'ape', 'fish']
    static feed_by_grain_animals =  ['fish']
    static feed_by_wheat_animals =  ['cow', 'goat', 'babycow', 'babygoat']  //PICKING NEGATIVE
    static pillable_animals =       ['cow', 'goat', 'ape', 'fish']
    static feed_by_banana_animals = ['ape']
    static pooping_animals =        ['cow', 'goat', 'babycow', 'babygoat', 'lion', 'fish', 'shark', 'ape']
    static die_in_winter_animals =  ['fish', 'shark', 'ape', 'babycow', 'babygoat']
    static lionpelt_unseeable_animals = ['lion', 'shark', 'ravenger', 'forestspirit', 'knave', 'shrieker']   //same level attack for mountain put bracket
    static camosuit_unseeable_animals = ['lion', 'ravenger', 'forestspirit', 'knave'] 
    static poop_chance =            .003
    static poop_chance_fed =        .01
    static animals =                {
                                    'cow': {'radius': [2, 6], 'drop': {'bone': 1, 'meat': 2, 'hide': 1}, 'health': 15, 'tickspermove': 50, 'spawn_terrain': ['dirt', 'grass'], 'moveable_terrain': ['dirt', 'grass'], 
                                    'relative_spawn_chance': 10, 'day': true, 'passive': true, 
                                    'food_seerange': 7, 'eatfoodchance': {'wheat': {'shelf':.3, 'ground': .8}}, 'breed_chance': .5}, //'cow

                                    'babycow': {'ticks_growup': 50, 'radius': [2, 6], 'drop': {}, 'health': 2, 'tickspermove': 40, 'spawn_terrain': ['grass'], 'moveable_terrain': ['grass', 'dirt'], 
                                    'relative_spawn_chance': 1, 'day': true, 'passive': true,
                                    'food_seerange': 2, 'eatfoodchance': {'wheat': {'shelf':.3, 'ground': .8}} }, //'babycow

                                    'goat': {'radius': [5, 8], 'drop': {'horn': 1, 'meat': 2}, 'health': 15, 'tickspermove': 40, 'spawn_terrain': ['mountain2', 'mountain1'], 'moveable_terrain': ['mountain2', 'mountain1'], 
                                    'relative_spawn_chance': 10, 'day': true, 'passive': true, 
                                    'breed_chance': .5, 'food_seerange': 10, 'eatfoodchance': {'wheat': {'shelf':.3, 'ground': .8}} }, //'goat

                                    'babygoat': {'ticks_growup': 50, 'radius': [5, 8], 'drop': {}, 'health': 4, 'tickspermove': 20, 'spawn_terrain': ['mountain1'], 'moveable_terrain': ['mountain1', 'mountain2'], 
                                    'relative_spawn_chance': 1, 'day': true, 'passive': true,
                                    'food_seerange': 2, 'eatfoodchance': {'wheat': {'shelf':.3, 'ground': .8}}}, //'babygoat

                                    'reveller': {'radius': [1, 8], 'drop': {'iron': 5, 'smoothstone': 5, 'meat': 5}, 'health': 80, 'tickspermove': 40, 'spawn_terrain': ['mountain2', 'mountain1'], 'moveable_terrain': ['mountain2', 'mountain1'], 
                                    'relative_spawn_chance': 2, 'day': true, 'passive': true, 
                                    'see_range': 15, 'animal_seerange': 10, 'attack': 30},  //'reveller

                                    'bandit': {'radius': [1, 2], 'drop': {'iron': 5, 'meat': 5}, 'health': 20, 'tickspermove': 20, 'spawn_terrain': ['mountain1', 'mountain2'], 'moveable_terrain': ['mountain1', 'mountain2'], 
                                    'attack': 10, 'attack_type': 'sharp', 'affliction': 'bleeding', 
                                    'relative_spawn_chance': 3, 'packsizemin': 3, 'packsizemax': 4, 'day': 'both', 'rounds_till_spawn': 25, 'passive': false, 
                                    'see_range': 5, 'affliction_chance': .05, 'lootmax': 10, 'loot': ['iron', 'iron', 'iron', 'iron', 'cookedmeat'], 'take_trophy_chance': .5},  //'bandit

                                    'ape': {'radius': [5, 6], 'drop': {'rock': 10, 'meat': 5}, 'health': 60, 'tickspermove': 30, 'spawn_terrain': ['grass', 'dirt', 'tree'], 'moveable_terrain': ['dirt', 'grass', 'tree'], 
                                    'attack': 10,
                                    'relative_spawn_chance': 1, 'packsizemin': 2, 'packsizemax': 4, 'day': true, 'passive': true, 
                                    'see_range': 15, 'animal_seerange': 10, 'food_seerange': 7, 'eatfoodchance': {'banana': {'shelf':.3, 'ground': .8}}}, //'ape

                                    'babyape': {'radius': [3, 4], 'drop': {}, 'health': 20, 'tickspermove': 20, 'spawn_terrain': ['tree'], 'moveable_terrain': ['grass', 'tree'], 
                                    'relative_spawn_chance': 1, 'day': true, 'passive': true,
                                    'see_range': 15, 'food_seerange': 2, 'eatfoodchance': {'banana': {'shelf':.3, 'ground': .8}}}, //'babyape

                                    'fish': {'radius': [3, 3], 'drop': {'fin': 1, 'rawfish': 1}, 'health': 5, 'tickspermove': 10, 'spawn_terrain': ['water'], 'moveable_terrain': ['water'], 'relative_spawn_chance': 5, 'tangled_duration': 20, 
                                    'day': true, 'packsizemin': 3, 'packsizemax': 4, 'passive': true, 
                                    'animal_seerange': 8, 'eatfoodchance': {'bait': {'shelf':.3, 'ground': {'shelf':.3, 'ground': .8}}, 'grain': .8}, 'food_seerange': 25}, //'fish

                                    'babyfish': {'radius': [1, 1], 'drop': {}, 'health': 1, 'tickspermove': 20, 'spawn_terrain': ['water'], 'moveable_terrain': ['water'], 'relative_spawn_chance': 1, 
                                    'day': true, 'passive': true, 
                                    'animal_seerange': 3, 'eatfoodchance': {'bait': {'shelf':.3, 'ground': .8}}, 'tangled_duration': 40}, //'babyfish

                                    'forestspirit': {'radius': [1, 2], 'drop': {'leaf': 10, 'forestessence': 1}, 'health': 50, 'tickspermove': 50, 'spawn_terrain': ['grass'], 'moveable_terrain': ['dirt', 'grass'], 'relative_spawn_chance': 3, 
                                    'attack': 5, 'attack_range': 3, 'affliction_chance': .5, 'attack_type': 'sharp', 'affliction': 'bleeding', 
                                    'day': true, 'rounds_till_spawn': 0, 'passive': true, 
                                    'see_range': 3, 'grow_tree_chance': .005, 'overwriteterrain': ['dirt', 'grass', 'stick', 'leaf', 'rock']}, //'forestspirit

                                    'angrybird': {'radius': [2, 3], 'drop': {'leaf': 2, 'meat': 1}, 'health': 10, 'tickspermove': 40, 'spawn_terrain': ['dirt', 'grass'], 'moveable_terrain': ['dirt', 'darkland', 'grass'], 'relative_spawn_chance': 3, 
                                    'attack': 3, 'affliction_chance': .01, 'attack_type': 'sharp', 'affliction': 'bleeding', 
                                    'day': true, 'passive': false, 'rounds_till_spawn': 15, //
                                    'see_range': 5, 'food_seerange': 5, 'eatfoodchance': {'chickweed': {'shelf':.3, 'ground': .8}, 'grain': {'shelf':.2, 'ground':.6}}}, //'angrybird

                                    'shrill': {'radius': [1, 1], 'drop': {'leaf': 2, 'meat': 1}, 'health': 10, 'tickspermove': 10, 'spawn_terrain': ['dirt', 'grass'], 'moveable_terrain': ['dirt', 'darkland', 'grass'], 'relative_spawn_chance': 3, 
                                    'attack': 5, 'affliction_chance': .01, 'attack_type': 'sharp', 'affliction': 'bleeding', 
                                    'day': 'both', 'passive': true, 'rounds_till_spawn': 35, //
                                    'see_range': 5, 'food_seerange': 5, 'eatfoodchance': {'mushroom': {'shelf':.3, 'ground': .8}, 'meat': {'shelf':.2, 'ground':.6}}}, //'shrill

                                    'charred': {'radius': [2, 2], 'drop': {'leaf': 2, 'meat': 1}, 'health': 30, 'tickspermove': 15, 'spawn_terrain': ['dirt', 'grass'], 'moveable_terrain': ['dirt', 'darkland', 'grass'], 'relative_spawn_chance': 3, 
                                    'attack': 15, 'affliction_chance': .05, 'attack_type': 'sharp', 'affliction': 'bleeding', 
                                    'day': true, 'passive': false, 'rounds_till_spawn': 60, //
                                    'see_range': 10, 'food_seerange': 5, 'eatfoodchance': {'chickweed': {'shelf':.3, 'ground': .8}, 'tulip': {'shelf':.2, 'ground':.6}}}, //'charred

                                    'abadee': {'radius': [2, 3], 'drop': {'leaf': 2, 'meat': 1}, 'health': 25, 'tickspermove': 30, 'spawn_terrain': ['dirt', 'grass'], 'moveable_terrain': ['dirt', 'darkland', 'grass'], 'relative_spawn_chance': 3, 
                                    'attack': 5, 'affliction_chance': .05, 'attack_type': 'sharp', 'affliction': 'bleeding', 
                                    'day': false, 'passive': false, 'rounds_till_spawn': 10, //
                                    'see_range': 15, 'food_seerange': 10, 'eatfoodchance': {'meat': {'shelf':.3, 'ground': .8}, 'rawfish': {'shelf':.2, 'ground':.6}}}, //'abadee

                                    'hairyboi': {'radius': [2, 3], 'drop': {'hide': 2, 'meat': 4}, 'health': 40, 'tickspermove': 30, 'spawn_terrain': ['mountain2'], 'moveable_terrain': ['mountain1', 'mountain2'], 'relative_spawn_chance': 3, 
                                    'attack': 8, 'affliction_chance': .05, 'attack_type': 'sharp', 'affliction': 'bleeding', 
                                    'day': false, 'passive': false, 'rounds_till_spawn': 10, //
                                    'see_range': 20, 'food_seerange': 10, 'eatfoodchance': {'leaf': {'shelf':.01, 'ground': .3}}}, //'hairyboi

                                    'deceiver': {'radius': [2, 3], 'drop': {'rock': 2, 'meat': 4}, 'health': 20, 'tickspermove': 10, 'spawn_terrain': ['dirt'], 'moveable_terrain': ['dirt', 'darkland', 'grass'], 'relative_spawn_chance': 3, 
                                    'attack': 15, 'affliction_chance': .05, 'attack_type': 'sharp', 'affliction': 'bleeding', 
                                    'day': false, 'passive': false, 'rounds_till_spawn': 60, //
                                    'see_range': 10, 'food_seerange': 25, 'eatfoodchance': {'cookedmeat': {'shelf':.3, 'ground': .8}}}, //'deceiver

                                    'lion': {'radius': [2, 3], 'drop': {'hide': 2, 'meat': 4}, 'health': 30, 'tickspermove': 35, 'spawn_terrain': ['dirt'], 'moveable_terrain': ['dirt', 'darkland', 'grass'], 'relative_spawn_chance': 3, 
                                    'attack': 5, 'affliction_chance': .05, 'attack_type': 'sharp', 'affliction': 'bleeding', 
                                    'day': 'both', 'passive': true, 'rounds_till_spawn': 30, //
                                    'see_range': 10, 'food_seerange': 25, 'eatfoodchance': {'meat': {'shelf':.3, 'ground': .8}}}, //'lion

                                    'shark': {'radius': [3, 4], 'drop': {'fin': 2, 'meat': 4}, 'health': 20, 'tickspermove': 15, 'spawn_terrain': ['water'], 'moveable_terrain': ['water'], 'relative_spawn_chance': 2, 
                                    'surface_dist': 10, 'attack': 15, 'packsizemin': 2, 'packsizemax': 4, 'affliction_chance': .05, 'attack_type': 'sharp', 'affliction': 'bleeding', 
                                    'day': 'both', 'passive': false, 'rounds_till_spawn': 20, 
                                    'see_range': 25, 'food_seerange': 25, 'eatfoodchance': {'rawfish': {'shelf':.3, 'ground': .8}, 'bait': {'shelf':.3, 'ground': .8}}}, //'shark

                                    'ravenger': {'radius': [1, 2], 'drop': {'iron': 5, 'meat': 6}, 'health': 50, 'tickspermove': 20, 'spawn_terrain': ['dirt', 'crimsonroot'], 'moveable_terrain': ['dirt', 'grass', 'crimsonroot'], 'relative_spawn_chance': 20, 
                                    'attack': 20, 'affliction_chance': .1, 'attack_type': 'sharp', 'affliction': 'bleeding', 
                                    'day': 'both', 'rounds_till_spawn': 80, 'escape_hole_chance': .3, 'passive': false, 
                                    'see_range': 20, 'food_seerange': 5, 'eatfoodchance': {'cookedmeat': {'shelf':.3, 'ground': .8}}}, //'ravenger

                                    'knave': {'radius': [1, 2], 'drop': {'eye': 1, 'meat': 5}, 'health': 20, 'tickspermove': 20, 'spawn_terrain': ['dirt', 'grass', 'crimsonroot'], 'moveable_terrain': ['dirt', 'grass', 'crimsonroot'], 'relative_spawn_chance': 2, 
                                    'attack': 10, 'packsizemin': 2, 'packsizemax': 4, 'affliction_chance': .05, 'attack_type': 'sharp', 'affliction': 'bleeding', 
                                    'day': false, 'rounds_till_spawn': 30, 'passive': false, 
                                    'see_range': 5, 'food_seerange': 15, 'eatfoodchance': {'cookedmeat': {'shelf':.3, 'ground': .8}}},                              //'knave

                                    // 'berserker': {'radius': [1, 2], 'drop': {'stolidheart': 1, 'meat': 10}, 'health': 100, 'tickspermove': 50, 'spawn_terrain': ['dirt', 'crimsonroot'], 'moveable_terrain': ['dirt', 'grass', 'water', 'mountain1', 'crimsonroot', 'darkland'], 'relative_spawn_chance': 2, 
                                    // 'attack': 50, 'attack_type': 'sharp', 'affliction': 'bleeding', 
                                    // 'day': false, 'rounds_till_spawn': 100, 'passive': false, 
                                    // 'see_range': 10, 'aoe_smash_attack': 10, 'aoe_smash_radius': 2, 'affliction_chance': .05, 'knockback_chance': .3, 'median_knockback_radius': 4}, //'berserker

                                    // 'bewitched': {'radius': [2, 3], 'drop': {'witheredvine': 1, 'meat': 8}, 'health': 50, 'tickspermove': 40, 'spawn_terrain': ['dirt', 'crimsonroot'], 'moveable_terrain': ['dirt', 'crimsonroot', 'grass', 'water', 'crimsonroot'], 'relative_spawn_chance': 5, 
                                    // 'attack': 30, 'affliction_chance': .05, 'attack_type': 'sharp', 'affliction': 'bleeding', 
                                    // 'day': false, 'rounds_till_spawn': 900, 'passive': false, 
                                    // 'see_range': 10, 'rooting_radius': 2, 'corruptable_terrain': ['dirt', 'grass', 'tree', 'coral1', 'coral2', 'stick', 'leaf', 'tulip', 'cattail']},  //'bewitched

                                    // 'shrieker': {'radius': [4, 7], 'drop': {'blackpowder': 1, 'meat': 3}, 'health': 10, 'tickspermove': 30, 'spawn_terrain': ['mountain1', 'mountain2', 'crimsonroot'], 'moveable_terrain': ['dirt', 'darkland', 'grass', 'mountain1', 'mountain2', 'water', 'crimsonroot'], 'relative_spawn_chance': 20, 
                                    // 'see_range': 10, 'attack': 20, 'attack_range': 3, 'affliction_chance': .05, 'attack_type': 'sharp', 'affliction': 'bleeding', 
                                    // 'day': false, 'rounds_till_spawn': 60, 'passive': false},                          //'shrieker

                                    // 'cinder': {'radius': [1, 5], 'drop': {'amber': 1, 'meat': 3}, 'health': 20, 'tickspermove': 25, 'spawn_terrain': ['mountain1', 'darkland', 'dirt', 'crimsonroot'], 'moveable_terrain': ['dirt', 'darkland', 'grass', 'mountain1', 'mountain2', 'water', 'crimsonroot'], 'relative_spawn_chance': 5, 
                                    // 'see_range': 5, 'attack': 20, 'attack_range': 3, 'affliction_chance': .05, 'attack_type': 'sharp', 'affliction': 'bleeding', 
                                    // 'throw_flame_chance': .1, 'light_terrain_chance': .5, 'light_terrain_radius': 3}, //'cinder

                                    // 'phantom': {'radius': [4, 6], 'drop': {'scale': 1, 'meat': 3}, 'health': 20, 'tickspermove': 20, 'spawn_terrain': ['mountain2', 'water', 'darkland', 'crimsonroot'], 'moveable_terrain': ['dirt', 'darkland', 'grass', 'mountain1', 'mountain2', 'water', 'crimsonroot'], 'relative_spawn_chance': 5, 
                                    // 'attack': 20, 'attack_range': 3, 'affliction_chance': .05, 'attack_type': 'sharp', 'affliction': 'bleeding', 
                                    // 'day': false, 'rounds_till_spawn': 60, 'passive': false, 
                                    // 'see_range': 20, 'morph_range': 12, 'morphable_objects': ['cow', 'goat', 'fish', 'tree']},      //'phantom

                                    // 'doctor': {'radius': [1, 1], 'drop': {'blackrose': 2}, 'health': 60, 'tickspermove': 30, 'spawn_terrain': ['darkland', 'mysterpond', 'crimsonroot'], 'moveable_terrain': ['dirt', 'darkland', 'grass', 'water', 'mysterpond', 'crimsonroot'], 'relative_spawn_chance': 3, 
                                    // 'see_range': 20, 'attack': 0, 'attack_range': 3, 'affliction_chance': .5, 'attack_type': 'sharp', 'affliction': 'bleeding', 
                                    // 'day': false, 'rounds_till_spawn': 40, 'passive': false, 
                                    // 'kill_grass_chance': .8, 'kill_tree_chance': .3}, //'doctor

                                    // 'reaper': {'radius': [1, 2], 'drop': {'bone': 4, 'soulessence': 1}, 'health': 30, 'tickspermove': 20, 'spawn_terrain': ['darkland', 'crimsonroot'], 'moveable_terrain': ['darkland', 'crimsonroot'], 'relative_spawn_chance': 5, 
                                    // 'attack': 30, 'attack_range': 1.5, 'affliction_chance': .5, 'attack_type': 'sharp', 'affliction': 'bleeding', 
                                    // 'day': false, 'rounds_till_spawn': 50, 'passive': false, 
                                    // 'see_range': 3, 'light_radius': 3, 'in_range_mult': 1.2, 'teleport_radius': 5, 'teleport_chance': .5}, //'reaper
                                
                                    }
    static passive_animals =        Object.keys(Game_state.animals).filter(name => {return Game_state.animals[name]['passive']})
    static monsters =               Object.keys(Game_state.animals).filter(name => {return !Game_state.animals[name]['passive']})
    static campfire_item_values =   {
                                    'food': {'rounds': 2, 'become': {'cookedfood': 1}},
                                    'meat': {'rounds': 4, 'become': {'cookedmeat': 1}},
                                    'rawfish': {'rounds': 2, 'become': {'cookedfish': 1}},
                                    'cookedmeat': {'rounds': 3, 'become': {'burntmeat': 1}},
                                    'wheatdough': {'rounds': 1, 'become': {'bread': 1}},
                                    'bread': {'rounds': 3, 'become': {'burntbread': 1}},
                                    'graindough': {'rounds': 1, 'become': {'cookie': 1}},
                                    'cookie': {'rounds': 3, 'become': {'burntcookie': 1}},
                                    'potato': {'rounds': 2, 'become': {'cookedpotato': 1}},
                                    'cookedpotato': {'rounds': 5, 'become': {'burntpotato': 1}},
                                    'carrot': {'rounds': 5, 'become': {'cookedcarrot': 1}},
                                    'cookedcarrot': {'rounds': 5, 'become': {'burntcarrot': 1}},
                                    'mussel': {'rounds': 2, 'become': {'cookedmussel': 1}},
                                    'stick': {'rounds': 1, 'become': {'fuel': 1}},
                                    'leaf': {'rounds': 1, 'become': {'fuel': 1}},
                                    'stickleaf': {'rounds': 1, 'become': {'fuel': 2}},
                                    'wood': {'rounds': 4, 'become': {'fuel': 5}},

                                    }
    static garden_item_values =     {
                                    'grainSeed': {'rounds': 10, 'become': {'grain': 1, 'grainSeed': 2}},
                                    'dandelionSeed': {'rounds': 12, 'become': {'dandelion': 1, 'dandelionSeed': 2}},
                                    'wheatSeed': {'rounds': 10, 'become': {'wheat': 1, 'wheatSeed': 2}},
                                    'chickweedSeed': {'rounds': 8, 'become': {'chickweed': 1, 'chickweedSeed': 2}},
                                    'stingingnettleSeed': {'rounds': 10, 'become': {'stingingnettle': 1, 'stingingnettleSeed': 2}},
                                    'potatoSeed': {'rounds': 15, 'become': {'potato': 1, 'potatoSeed': 2}},
                                    'carrotSeed': {'rounds': 15, 'become': {'carrot': 1, 'carrotSeed': 2}},
                                    'tulipSeed': {'rounds': 5,  'become': {'tulip': 4}},
                                    'grain': {'rounds': 5,  'become': {}, 'night_dormant': true},
                                    'dandelion': {'rounds': 5,  'become': {}, 'night_dormant': true},
                                    'wheat': {'rounds': 5,  'become': {}, 'night_dormant': true},
                                    'chickweed': {'rounds': 5,  'become': {}, 'night_dormant': true},
                                    'stingingnettle': {'rounds': 5,  'become': {}, 'night_dormant': true},
                                    'potato': {'rounds': 5,  'become': {'potatoSeed': 2}, 'night_dormant': true},
                                    'carrot': {'rounds': 5,  'become': {'carrotSeed': 2}, 'night_dormant': true},
                                    }
    static greenhouse_item_values = {
                                    'grainSeed': {'rounds': 5, 'become': {'grain': 1, 'grainSeed': 4}},
                                    'dandelionSeed': {'rounds': 6, 'become': {'dandelion': 1, 'dandelionSeed': 4}},
                                    'wheatSeed': {'rounds': 6, 'become': {'wheat': 1, 'wheatSeed': 4}},
                                    'chickweedSeed': {'rounds': 6, 'become': {'chickweed': 1, 'chickweedSeed': 4}},
                                    'stingingnettleSeed': {'rounds': 6, 'become': {'stingingnettle': 1, 'stingingnettleSeed': 4}},
                                    'potatoSeed': {'rounds': 6, 'become': {'potato': 1, 'potatoSeed': 4}},
                                    'carrotSeed': {'rounds': 6, 'become': {'carrot': 1, 'carrotSeed': 4}},
                                    'tulipSeed': {'rounds': 3, 'become': {'tulip': 6}},
                                    'grain': {'rounds': 10, 'become': {}, 'night_dormant': true},
                                    'dandelion': {'rounds': 10, 'become': {}, 'night_dormant': true},
                                    'wheat': {'rounds': 10, 'become': {}, 'night_dormant': true},
                                    'chickweed': {'rounds': 10, 'become': {}, 'night_dormant': true},
                                    'stingingnettle': {'rounds': 10, 'become': {}, 'night_dormant': true},
                                    'potato': {'rounds': 10, 'become': {'potatoSeed': 5}, 'night_dormant': true},
                                    'carrot': {'rounds': 10, 'become': {'carrotSeed': 5}, 'night_dormant': true},
                                    'bananaSeed': {'rounds': 5, 'becomes': {'banana': 4, 'bananaSeed': 2}},
                                    }
    static smelter_item_values =    {
                                    'sand': {'rounds': 2, 'become': {'glass': 1}},
                                    'rock': {'rounds': 3, 'become': {'smoothstone': 1}},
                                    'ironore': {'rounds': 4, 'become': {'iron': 1}},
                                    'clay': {'rounds': 4, 'become': {'brick': 1}},
                                    'wood': {'rounds': 2, 'become': {'fuel': 5}},

                                    }
    static shelf_items_values =     {
                                    'meat': {'rounds': 3, 'become': {'drymeat': 1}, 'night_dormant': true},
                                    'potato': {'rounds': 5, 'become': {'rottenpotato': 1}},
                                    'carrot': {'rounds': 5, 'become': {'rottencarrot': 1}},
                                    'manuer': {'rounds': 5, 'become': {'driedmanuer': 1}},
                                    }
    static fridge_item_values =    {
                                    'water': {'rounds': 3, 'become': {'ice': 1}}
                                    }
    static lumbermill_item_values = {
                                    'wood': {'rounds': 3, 'become': {'plank': 4, 'stick': 4}},
                                    'stick': {'rounds': 4, 'become': {'stick': 2}},
                                    'edenbush': {'rounds': 3, 'become': {'forestessence': 1, 'wood': 5}}
                                    }
    static mines_item_values =      {
                                    'bomb': {'rounds': 1, 'become': {'ironore': 20}},
                                    }
    static campfire_items =         Object.keys(Game_state.campfire_item_values)
    static garden_items =           Object.keys(Game_state.garden_item_values).concat(['fertilizer'])
    static greenhouse_items =       Object.keys(Game_state.greenhouse_item_values).concat(['fertilizer'])
    static smelter_items =          Object.keys(Game_state.smelter_item_values).concat(['fuel'])
    static lumbermill_items =       Object.keys(Game_state.lumbermill_item_values)
    static additional_shelf_items = ['wheat', 'grain']
    static composter_items =        ['stick', 'leaf', 'wood', 'manuer', 'carrot', 'potato', 'wheat', 'grain']
    static carcasscollector_items = []
    static fishfeeder_items =       ['grain', 'bait']
    static composter_conversion_ratio = .4
    static composter_item_values =  {'stick': {'value': 1},
                                    'leaf': {'value': 1},
                                    'wood': {'value': 5},
                                    'manuer': {'value': 10},
                                    'carrot': {'value': 2},
                                    'potato': {'value': 2},
                                    'banana': {'value': 2},
                                    'wheat': {'value': 2},
                                    'grain':{'value': 2} 
                                    }
    static cauldron_items =         ['poisonessence', 'benefactoressence', 'volatileessence', 'splashessence']
    static mortar_items =           ['wheatflour', 'grainflour', 'dandelionpaste', 'chickweedpaste', 'stingingnettlepaste', 'tulippaste', 'fertilizer', 'groundcharcoal']
    static not_materials =          ['round', 'add_amount']
    static craftable_items =        {       
                                    'sharprock': {'rock': 1},                                         //  remember terrain drawing, player movement area, bomb destroying terrain, blowing up darkland, changed positions   
                                    'sharkrock_1': {'shard': 1},      
                                    'food': {'leaf': 3},                                              //??
                                                                                                      //  crafting progression, base is more important, make bases-quary stronger so that enemy can't just rush in head first
                                    'arrow': {'stick': 2, 'sharprock': 1, 'add_amount': 3},           //  item to store arrow
                                    'pebble': {'rock': 1},                                            //  base repairs, vulnarability during crafting for base
                                    'rope': {'leaf': 1, 'stick':1, 'add_amount': 2},                  //  sharp rock bleeding
                                    'leafcover': {'leaf': 1},                                         //  custom progression system, diff monsters diff decision and diff strategies
                                                                                                      //  remember durability 
                                                                                                      //  screwed in area without matierals to get to mountain
                                    'bottle': {'torch': 1, 'mud': 1},                                 //  crafting bomb, enemy plans and makes it so that player can't throw it 
                                    'string': {'stick': 2, 'leaf': 2, 'sharprock': 1},                //non numerical progression
                                    'tulipSeed': {'tulip': 1},
                                    'wheatflour': {'wheat': 2},
                                    'grainflour': {'grain': 2},
                                    'wheatdough': {'wheatflour': 1, 'bottle': {'water': 1}},
                                    'graindough': {'grainflour': 1, 'bottle': {'water': 1}},

                                    'mudsmear': {'mud': 2},
                                    'cementsmear': {'wetcement': 2},

                                    'groundcharcoal': {'charcoal': 1},
                                    'fuel': {'groundcharcoal': 1},
                                    'fertilizer': {'groundcharcoal': 1},

                                    'cereal': {'grain': 1},
                                    'goldencookie': {'dandelionpaste':1, 'cookie': 1},
                                    'dandelionpaste': {'dandelion': 1},
                                    'chickweedpaste': {'chickweed': 1},
                                    'stingingnettlepaste': {'stingingnettle': 1},
                                    'tulippaste': {'tulip': 1},
                                    'rudimentaryheal': {'tulip': 1, 'leaf': 1, 'stick': 1},
                                    'bandage': {'bottle': {'water': 1}, 'leaf': 2, 'tulippaste': 1},
                                   
                                    'thatch': {'wood': 1, 'dagger': 1, 'add_amount': 4},
                                    'twine': {'cattail': 1, 'sharprock': 1},
                                    'twinenet': {'twine': 2},
                                    'dam': {'stick': 5, 'twine': 2},

                                    'stonepath': {'stone': 2},
                                    'mudpath': {'mud': 2},

                                    'bait': {'shell': 1},
                                    'bait_mussel': {'mussel': 1},
                                    'flippers': {'twine': 1, 'fin': 2},
                                    'largebait': {'meat': 1},
                                    'largebait_fish': {'rawfish': 2},
                                    'sundial': {'stick': 1, 'stone': 1},
                                    'lasso_thatch': {'thatch': 3},
                                    'lasso_twine': {'twine': 5},
                                    'stickleaf': {'stick': 1, 'leaf': 1},

                                    'workbench_scrapwork': {'wood': 1, 'sharprock': 3, 'stick': 5},

                                    'cookedmeat': {'torch': 1, 'meat': 1, 'round': 2},
                                    'cookedfish': {'torch': 1, 'rawfish': 1, 'round': 2},
                                    }
    static craftable_items_workshop={
                                    'ironchest': {'chest': 1, 'iron': 4},
                                    'wheel': {'wood': 1},
                                    'minecart': {'wheel': 4, 'ironchest': 1},
                                    'carcasscollector': {'chest': 1, 'beacon': 1}
                                    }
    static craftable_items_cauldron = {
                                      'poisonessence': {'bottle': {'poison': 1}, 'mushroom': 1, 'chickweed': 2, 'round': 3},    ///////////////??????????/ rounds
                                      'benefactoressence': {'snow': 1, 'tulip': 2, 'stingingnettle': 1, 'round': 3},
                                      'volatileessence': {'blackpowder': 1, 'fireball': 1},
                                      'splashessence': {'fireball': 1, 'bottle': {'poison': 1}, 'blackpowder': 1, 'round': 3}, //aoe
                                      'stunmix': {'poisonessence': 1, 'tooth': 1, 'bottle':1, 'round': 3},
                                      'stunsplash': {'stunmix': 1, 'splashessence': 1, 'round': 3},
                                      'poisonmix': {'poisonessence': 1, 'bottle': {'poison': 1, 'round': 3}},
                                      'poisonsplash': {'poisonmix': 1, 'splashessence': 1, 'round': 3},
                                      'sightsplash': {'splashessence': 1, 'eye': 1, 'round': 3},
                                      'repellmix': {'poisonessence': 1, 'torch': 1, 'round': 3},
                                      'smogmix': {'bottle': {'poison': 1}, 'poisonessence': 1, 'round': 3},
                                      'hauntingsapling': {'log': 1, 'poisonessence': 1, 'round': 3},
                                      'growthmix': {'benefactoressence': 1, 'bone': 2, 'chickweed': 1, 'leaf': 5, 'round': 3},
                                      'antipoisonmix': {'benefactoressence': 1, 'tulippaste': 2, 'round': 3},
                                      'buffmix': {'benefactoressence': 1, 'goldencookie': 1, 'round': 3},
                                      'weaknessmix': {'poisonessence': 1, 'witheredbark': 2, 'round': 3},
                                      'weaknesssplash': {'weaknessmix': 1, 'splashessence': 1, 'round': 3},
                                      'poisondrip': {'poisonessence': 1, 'round': 3},
                                      'actionmix': {'benefactoressence': 1, 'goldencookie': 2, 'round': 3},
                                      'susfood': {'food': 1, 'poisonessence': 1},
                                      'mineralpill': {'benefactoressence': 1, 'iron': 1},
                                      'medicine': {'benefactoressence': 1, 'chickweedpaste': 1, 'tulippaste': 1},
                                      }
    static craftable_items_drafter ={
                                    'fence': {'wood': 1, 'plank': 2},
                                    'fencegate': {'wood': 1, 'plank': 2},
                                    'gate': {'scaffold': 2, 'smoothstone': 3},
                                    'woodenpillar': {'wood': 3, 'axe': 1},
                                    'frame': {'scaffold': 1, 'wood': 2, 'plank': 2},
                                    'ironwall': {'iron': 4, 'scaffold': 1}, /////////////////////////
                                    }
    static craftable_items_base =   {
                                    'workbench': {'stick': 5, 'rock': 3}
                                    }
    static craftable_items_bench =  {
                                    'stick': {'wood': 1, 'add_amount': 5},                   //mounains-weapons, forest-building, darkland-gardening, travaller (flying, auto, boat, telelport, )
                                    'plank_wood': {'wood': 1, 'add_amount': 3},   //weapons+buiding = turrets, gardening + building = poison gas, greenhouse, bug repellent, weapons + gardening = weapons with effects
                                    'plank': {'stick': 4},   
                                    'glue': {'hide': 1, 'bottle': {'water': 1}}, //
                                    'glue_wheat': {'wheatflour': 2, 'bottle': {'water': 2}},
                                    'bucket': {'iron': 3, 'bottle': 1},
                                    'scaffold': {'stick': 4, 'glue': 1},
                                    'firestarter': {'stick': 2, 'string': 1},
                                    'firestarter_iron': {'sharprock': 1, 'iron': 1},

                                    'composter': {'plank': 4, 'manuer': 1},
                                    'cauldron': {'iron': 3, 'campfire': 1},
                                    'workshop': {'scaffold': 3, 'toolkit': 1, 'ironwall': 1},
                                    'base': {'stick': 5, 'rock': 7, 'mud': 3},      //  remember flamabl items
                                    'mortar': {'rock': 1, 'bottle': {'water': 1}, 'dagger': 1},
                                    'toolkit': {'ironaxe': 1, 'ironshovel': 1, 'ironpickaxe': 1, 'chest': 1},
                                    'campfire': {'torch': 1, 'stick': 5, 'wood': 1},           //  pending events crafting
                                    'gardenbed': {'dirt': 2, 'hoe': 1, 'plank': 1},
                                    'treepot': {'dirt': 3, 'plank': 4},
                                    'condenser': {'leaf': 10, 'bucket': 1}, ////////////////////////////////////////////////////////
                                    'chest': {'glue': 1, 'plank': 4},
                                    'shelf': {'plank': 4, 'stick': 4, 'glue': 1},
                                    'fishfeeder': {'plank': 2, 'stick': 4, 'glue': 1},
                                    'fridge': {'shelf': 1, 'iron': 3, 'ice': 2},
                                    'backpack': {'thatch': 2, 'curedhide': 2 , 'glue': 1},
                                    'quiver': {'curedhide': 3, 'glue': 1},
                                    'beacon': {'torch': 3, 'fireball': 1},          //  additional actions which reduce acp spending compared to simpler actions such  as 

                                    'fireball': {'torch': 1, 'leaf':5, 'bottle': {'poison': 1}},             //  low damage consistent synergize with damager buff
                                    'snowball': {'bottle': 1, 'snow': 3},           //chance for freeze

                                    'shovel': {'stick': 2, 'rock': 1 },           //  drunk has unknown acp move points
                                    'ironshovel': {'shovel': 1, 'iron': 1},
                                    'pickaxe': {'stick': 1, 'rock': 2},            // potions, bombs, lingering aoe over mult rounds, 
                                    'ironpickaxe': {'pickaxe': 1, 'iron': 1},
                                    'axe': {'stick': 2, 'rock': 2} ,               // intermid activity like animals - strategy piroity get weapons or look for more items
                                    'ironaxe': {'axe': 1, 'iron': 1},
                                    'hoe': {'rock': 1, 'stick': 2},
                                    'ironhoe': {'hoe': 1, 'iron': 1},
                                    'bow': {'stick': 3, 'leaf': 2},                 // survival activities food

                                    'dagger': {'stick': 1, 'sharprock': 1},  
                                    'smelter': {'rock': 10, 'campfire': 1},         // has to be items which affect to depend on the environment in some way
                                    'divinggear': {'leaf': 5, 'bottle': 2},         //
                                    'spike': {'stick': 5, 'sharprock': 5},          //
                                    'battleaxe': {'iron': 4, 'stick': 2, 'axe': 1},           //
                                    
                                    'gasbomb': {'volatileessence': 1, 'smogmix': 1},
                                    'bomb': {'volatileessence': 1, 'bottle': 1},    //  straight up hitting someone with weapon, parring to make attacks more powerful 
                                    'landmine': {'bomb': 1, 'beacon':1},            //
                                    'nettrap': {'rope': 4, 'stick': 2},             //
                                    'snowbomb': {'bottle': 1, 'snowball': 2, 'volatileessence': 1},        //more acp when walking through
                                    
                                    'ladder': {'stick': 2},                         // iron ore mines, group of monster
                                    'stair': {'mud': 2, 'rock': 2},                 //  changes points-acp, damage, durability, crafting, range, block, 
                                    'raft': {'plank': 1, 'mud': 2},                 //  can't make player effects too complex game objects gui will break broken
                                    'climbinggear': {'rope': 2, 'rock': 1},         //take away fat effect  
                                    'bridge': {'plank': 1, 'rope': 2},
                                    
                                    'grapplinghook': {'iron': 1, 'rope': 5},        // grapple to mountain
                                    'floodbucket': {'bottle': {'water': 3}, 'bucket': 1},//flood an area
                                    'fishinghook': {'dagger': 1, 'string': 1},      //get fish from water 
                                    'icewall': {'ice': 3},                          //melts get ice by putting snow in water
                                    'ironwall': {'iron': 4},                        //tall as m2
                                    
                                    'fisingspear': {'stick': 3, 'thatch': 3, 'rope': 1},
                                    '古琴': {'plank': 3, 'string': 2},              // spawning place of prime base limits how far you can go, therefore items in your proximity will have to be the main strategy point.
                                    'armor': {'iron': 3, 'glue': 1},
                                    'thornsarmor': {'spike': 1, 'armor': 1},
                                    'fatarmor': {'iron': 2, 'armor': 1},
                                    'pike': {'iron': 3, 'stick': 2, 'glue': 1},
                                    'warhammer': {'iron': 3, 'rock': 4, 'stick': 2, 'glue': 1}, //place mushroom and tulip on  special terrain
                                    'weaponkit': {'workbench': 1, 'iron': 2, 'pickaxe': 1},  //--------
                                    'baselard': {'dagger':1, 'iron': 1},
                                    'shiv': {'dagger': 1, 'snow': 1, 'iron': 1},
                                    'chain': {'iron': 2, 'fireball': 1},
                                    'machete': {'iron': 2, 'fireball': 1, 'dagger': 1},
                                    'crossbow': {'iron': 1, 'string': 1, 'stick': 1, 'plank': 1},
                                    '暗器': {'dagger': 1, 'iron': 1, 'glue': 1},
                                    'mask': {'curedhide': 1, 'glue': 1},
                                    'glove': {'curedhide': 1, 'glue': 1},
                                    'lionpelt': {'curedhide': 3, 'glue': 1},
                                    'camosuit': {'leaf': 5, 'stick': 5, 'thatch': 2},
                                    'scarecrow': {'thatch': 3, 'glue': 1},
                                    'slientboots': {'thatch': 2, 'leaf': 5},
                                    'mountainboots': {'rock': 5, 'stick': 2},

                                    'binocular': {'glass': 2, 'wood': 1, 'eye': 1},
                                    'hammock': {'woodenpillar': 2, 'thatch': 3}, //////////////////////////put on tree and take off tree
                                    'trophy': {'iron': 2}
                                    

                                    //action point gaining ///////////////////////

                                    //pelt into lion suit
                                    //combine seeds with potions poision nettles
                                    //food to wtich to animal farm, weapons specilize range close aoe..., 
                                    //piroitize materials or defense or attack or food
                                    //mystery pond cyphener, machines to collect can be upgraded using...
                                    //updraging tools to specialize for dif thigns
                                    //multi state bulding
                                    //brute destroy things
                                    //

                                    //resource collector dinamite, darkland creating fumes.

                                    //research facility
                                    //nails for achi + armoury

                                    //resources can be put into a research

                                    //stick stone leaf gong into all 4 destitutew -stickleaf into fuel, iron to increase breeding chance, fertilizer using manuer and composterer
                                    //minerals into garden increase harvest
                                    //leaves into achti        /////////////////
                                    //carcass collecter
                                    //animl group with resource-human pack with mineral stash

                                    //anti sickness ///////////

                                    // 'probe': {'magicpotion': 1, 'iron': 1},         //
                                    // 'tecpatl': {'iron': 1, 'stick': 1},             // 
                                    // 'cursedstick': {'stick': 1, 'bottle': {'poison': 1}},       
                                    // 'hammer': {'iron': 3, 'stick': 1},
                                    // 'bat': {'stick': 5, 'rock':1},
                                    // 'spear': {'iron': 1, 'stick': 3},
                                    // 'icebomb': {'bottle': {'snow': 2}, 'bomb': 1},       //freezes enemy and water
                                    // 'magicpotion': {'bottle': {'poison': 2}, 'bottle': {'snow': 1}},
                                    // 'multiknife': {'dagger': 3, 'iron': 1},
                                    // 'armor': {'iron': 2},
                                    // 'boomerang': {'stick': 5, 'rock': 2},
                                    // 'soulboots': {'bottle': {'blood': 1}, 'iron': 2},
                                    // 'scope': {'glass': 2, 'iron': 1},
                                    // 'trident': {'bottle': {'water': 1}, 'iron': 2},
                                    // 'slipperyarmor': {'armor': 1, 'snow': 2},
                                    // 'garbagepick': {'iron': 2, 'bottle': {'poison': 1}},
                                    // 'nutcase': {'brick': 3, 'armor': 1},           //brick from smelting mud
                                    // 'scythe': {'iron': 4, 'bottle': {'blood': 1}},
                                    // 'spyglass': {'glass': 3, 'stick': 3},
                                    // 'scrapper': {'iron': 3},
                                    // '暗器': {'iron': 1},
                                    // 'brickarmor': {'armor': 1, 'brick': 4},
                                    // 'cage': {'iron': 3},
                                    // 'lantern': {'torch': 3, 'cage': 1},
                                    // 'quiver': {'leather': 3},
                                    // 'blowdart': {'stick': 2}
                                    }
    static all_craftable_items =    Object.assign({}, Game_state.craftable_items_drafter, Game_state.craftable_items, Game_state.craftable_items_base, Game_state.craftable_items_bench, Game_state.craftable_items_cauldron)                       

    static all_items =              {
                                    'cow': {'obtaining': 'NA', 'use': 'kill to get meat use for food'},
                                    'babycow': {'obtaining': 'NA', 'use': 'grow to cow'},
                                    'goat': {'obtaining': 'NA', 'use': 'kill to get meat use for food'},
                                    'babygoat': {'obtaining': 'NA', 'use': 'grow to goat'},
                                    'lion': {'obtaining': 'NA', 'use': 'it will kill you, but you can also kill it if you gud'},
                                    'ape': {'obtaining': 'NA', 'use': 'attacks enemies like banaaanana'},
                                    'babyape': {'obtaining': 'NA', 'use': 'grow to ape'},
                                    'reveller': {'obtaining': 'NA', 'use': 'attacks monsters kill to get iron'},
                                    'shark': {'obtaining': 'NA', 'use': 'eats you eats fish'},
                                    'fish': {'obtaining': 'NA', 'use': 'swims likes bait'},
                                    'forestspirit': {'obtaining': 'NA', 'use': 'grows trees hard to see'},
                                    'ravenger': {'obtaining': 'NA', 'use': 'night monster mid level'},
                                    'knave': {'obtaining': 'NA', 'use': 'group of mid level night monsters spawning next to campfire'},
                                    'shrieker': {'obtaining': 'NA', 'use': 'flying hits at distance night monster'},
                                    'phantom': {'obtaining': 'NA', 'use': 'night monster invisible until right next to you'},
                                    'doctor': {'obtaining': 'NA', 'use': 'night monster creates smog around it that suffocate you'},
                                    'reaper': {'obtaining': 'NA', 'use': 'night monster holds a torch and meanders in darkland'},
                                    'berserker': {'obtaining': 'NA', 'use': 'night monster smashing everything like you and walls'},
                                    'bewitched': {'obtaining': 'NA', 'use': 'night monster grows roots everywhere and smashes things'},
                                    'cinder': {'obtaining': 'NA', 'use': 'night monster burns things'},

                                    'hide': {'obtaining': 'kill lion', 'use': 'crafting material'},
                                    'bone': {'obtaining': 'cow', 'use': 'crafting material'},
                                    'horn': {'obtaining': 'goat', 'use': 'crafting material'},

                                    'mountain1': {'obtaining': 'NA', 'use': 'See Further to and from mountain1, range increase for long range weapons'},
                                    'mountain2': {'obtaining': 'NA', 'use': 'See Further to and from mountain2, range increase for long range weapons, higher than mountain 1'},
                                    'river': {'obtaining': 'NA', 'use': 'Drown in river after 1 round'},
                                    'darkland': {'obtaining': 'NA', 'use': 'Can\'t see far in darkland'},
                                    'mysterpond': {'obtaining': 'NA', 'use': 'Collect bottles of poison, untraversible'},
                                    'grass': {'obtaining': 'NA', 'use': 'get seeds by using dagger or scythe on grass'},
                                    'tree': {'obtaining': 'NA', 'use': 'use axe on tree to get wood and leafs'},
                                    'edentree': {'obtaining': '', 'use': ''},
                                    'orevein': {'obtaining': '', 'use': ''},
                                    'coral1': {'obtaining': '', 'use': ''},
                                    'coral2': {'obtaining': '', 'use': ''},

                                    'wood': {'obtaining': 'use axe on tree', 'use': 'crafting material'},
                                    'stick': {'obtaining':'pick from environment', 'use': 'crafting material'},
                                    'rock': {'obtaining':'pick from environment or mine from mountain', 'use': 'crafting material'},
                                    'leaf': {'obtaining':'pick from environment', 'use': 'crafting material'},
                                    'dirt': {'obtaining':'use shovel on dirt', 'use': 'crafting material throw in water becomes mud'},
                                    'mussel': {'obtaining': '', 'use': ''},
                                    'shell': {'obtaining': '', 'use': ''},
                                    'lilypad': {'obtaining': '', 'use': ''},
                                    'cattail': {'obtaining': '', 'use': ''},
                                    'sponge': {'obtaining': 'use fist on coral', 'use': 'dry up water'},
                                    'mushroom': {'obtaining': 'pick up using \'t\'', 'use': ''},
                                    'tulip': {'obtaining': 'pick up using \'t\'', 'use': ''},
                                    
                                    'thatch': {'obtaining': 'get from cutting down tree', 'use': 'crafting material'},
                                    'iron ore': {'obtaining':'mine mountain using pickaxe', 'use': 'smelt to create iron ingot'},
                                    'sand': {'obtaining':'use shovel on water', 'use': 'smelt to get glass'},
                                    'snow': {'obtaining':'use shovel on mountain2', 'use': 'crafting material'},
                                    'snowball': {'use': 'crafting material'},
                                    'glass': {'obtaining':'put sand in smelter', 'use': 'crafting material'},
                                    'smoothstone': {'obtaining':'put rock in smelter', 'use': 'crafting material'},
                                    'iron': {'obtaining':'put iron ore in smelter', 'use': 'crafting material'},
                                    'sharprock': {'use': 'crafting material'},
                                    'pebble': {'use': 'crafting material'},
                                    'leafcover': {'use': 'crafting material'},
                                    'twine': {'use': 'crafting material'},
                                    
                                    'bandage': {'use': 'heal bleeding'},
                                    'medicine': {'use': 'heal sickness'},
                                    
                                    'torch': {'obtaining': 'use stick on stick on ground', 'use': 'crafting material'},
                                    'bottle': {'use': 'crafting material'},
                                    'plank': {'use': 'crafting material'},
                                    'string': {'use': 'crafting material'},
                                    'rope': {'use': 'crafting material'},
                                    
                                    'workbench': {'use': 'crafting material'},
                                    'garden': {'obtaining':'use hoe on dirt', 'use': 'grow crops'},
                                    'campfire': {'use': 'cook food and other items'},
                                    'beacon': {'use': 'light source that can be seen from far'},
                                    'smelter': {'use': 'smelt things like iron ore'},
                                    'mortar': {'use': 'create paste with'},
                                    'chest': {'use': 'store things, max 10 items'},
                                    'cauldron': {'use': 'craft potions'},
                                    'shelf': {'use': 'store food longer shelf life'},
                                    'fridge': {'use': 'store food longer shelf life'},
                                    'quiver': {'use': 'hold arrows'},
                                    'backpack': {'use': 'holds materials'},
                                    
                                    'raft': {'use': 'faster in water-won\'t drown'},
                                    'stair': {'use': 'quickly get up mountains and walls infinite use'},
                                    'ladder': {'use': 'climb up things 1 use'},
                                    
                                    'base': {'use': ' regular storing base heals when you around'},
                                    'rockwall': {'obtaining': 'scaffold multi stage building 2smoothstone', 'use': 'it\'s a wall'},
                                    'brickwall': {'obtaining': 'scaffold multi stage building 2brick', 'use': 'it\'s a wall'},
                                    'woodenwall': {'obtaining': 'scaffold multi stage building 1 plank', 'use': 'structure it a wall'},
                                    'cementwall': {'obtaining': 'scaffold multi stage building ', 'use': 'structure it a wall'},
                                    'wetcementwall': {'obtaining': 'scaffold multi stage building ', 'use': 'structure becomes cement wall'},
                                    'ironwall': {'obtaining': 'scaffold multi stage building ', 'use': 'structure it a wall'},
                                    'stonetower': {'obtaining': 'scaffold multi stage building 2stonepillar 4smoothstone', 'use': 'structure see further'},
                                    'woodentower': {'obtaining': 'scaffold multi stage building 2woodenpillar 4plank', 'use': 'structure see further'},
                                    'fence': {'obtaining': '', 'use': 'structure low level block for animals'},
                                    'fencegate': {'obtaining': '', 'use': 'structure openable fence'},
                                    'greenhouse': {'obtaining': 'scaffold multi stage building ', 'use': 'structure better farm'},
                                    'lumbermill': {'obtaining': 'scaffold multi stage building ', 'use': 'structure infinite wood when eden bush is stored within'},
                                    'mines': {'obtaining': 'scaffold multi stage building ', 'use': 'structure infinite iron maybe using pickaxe on it'},
                                    'brickfoundation': {'obtaining': '', 'use': 'structure to build towers on'},
                                    'cementfoundation': {'obtaining': '', 'use': 'structure to build towers on'},
                                    'wetcementfoundation': {'obtaining': '', 'use': 'structure to build towers on'},


                                    'twinenet': {'use': 'ensnare fish'},
                                    'nettrap': {'use': 'enemy will be entangled which increases energy use'},
                                    'bait': {'use': 'attracts small fish'},
                                    'largebait': {'use': 'attracts big fish'},
                                    'scarecrow': {'use': ''},
                                    'spike': {'use': 'put in hole, if enemy touches spike they will take damage'},
                                    'landmine': {'use': 'proximity explosion'},
                                    'gasbomb': {'use': 'throw-radius around thrown area is filled with gas that acts like darklands'},
                                    'bomb': {'use': 'explode on timer, once crafted timer starts, once thrown timer stops until round is ended'},
                                    'snowbomb': {'use': 'freeze water and apply freeze effect on objects (you, enemy, animals)'},
                                    
                                    'divinggear': {'use': 'diving in water become invisible'},
                                    'climbinggear': {'use': 'climb mountains-less energy traveling on montains'},
                                    'flippers': {'use': 'swim faster'},
                                    'armor': {'use': 'protect'},
                                    'thornsarmor': {'use': 'hurts'},
                                    'fatarmor': {'use': 'damage less than 10 is absorbed'},
                                    'mask': {'use': 'breath smog'},
                                    'lionpelt': {'use': 'hide as lion some monsters can\'t see you'},
                                    'camosuit': {'use': 'wear to look like grass'},
                                    
                                    'shovel': {'use': 'dig things'},
                                    'ironshove': {'use': 'dig things'},
                                    'pickaxe': {'use': 'mine things'},
                                    'ironpickaxe': {'use': 'mine things'},
                                    'axe': {'use': 'chop trees'},
                                    'ironaxe': {'use': 'chop trees'},
                                    'hoe': {'use': 'gardening'},
                                    'ironhoe': {'use': 'gardening'},
                                    'bow': {'use': 'long range attacking'},
                                    'arrow': {'use': 'crafting material'},
                                    'dagger': {'use': 'crafting material, attacking'},
                                    'fireball': {'use': 'throwable, players gets lit is not thrown in 1 round'},
                                    '古琴': {'use': 'aoe attack from player position'},
                                    'battleaxe': {'use': 'large damage make one fat and encumbered which means more energy when moving'},
                                    'pike': {'use': 'longer ranged attack'},
                                    'warhammer': {'use': 'aoe attack'},
                                    'weaponkit': {'use': ''},
                                    'baselard': {'use': 'throwable stun'},
                                    'shiv': {'use': 'go fast when stabbing'},
                                    'chain': {'use': 'pull enemies towards ya\' and stun'},
                                    'machete': {'use': 'dash damage'},
                                    'crossbow': {'use': 'large damage high accuracy'},
                                    '暗器': {'use': 'low acp throwable'},

                                    'lasso': {'use': 'lasso animals towards you'},
                             
                                    'grainSeed': {'obtaining': 'use dagger or scythe on grass', 'use': 'grow to become their non seed form'},
                                    'dandelionSeed': {'obtaining': 'use dagger or scythe on grass', 'use': 'grow to become their non seed form'},
                                    'wheatSeed': {'obtaining': 'use dagger or scythe on grass', 'use': 'grow to become their non seed form'},
                                    'chickweedSeed': {'obtaining': 'use dagger or scythe on grass', 'use': 'grow to become their non seed form'},
                                    'stingingnettleSeed': {'obtaining': 'use dagger or scythe on grass', 'use': 'grow to become their non seed form'},
                                    'potatoSeed': {'obtaining': 'use dagger or scythe on grass', 'use': 'grow to become their non seed form'},
                                    'carrotSeed': {'obtaining': 'use dagger or scythe on grass', 'use': 'grow to become their non seed form'},
                                    'bananaSeed': {'obtaining': 'use dagger or scythe on grass', 'use': 'grow to become their non seed form'},
                                    'dandelion': {'obtaining': 'found in env', 'use': 'craftable item'},
                                    'wheat': {'obtaining': 'use dagger or scythe on grass', 'use': 'craftable item'},
                                    'chickweed': {'obtaining': 'use dagger or scythe on grass', 'use': 'craftable item'},
                                    'stingingnettle': {'obtaining': 'use dagger or scythe on grass', 'use': 'craftable item'},
                                    
                                    
                                    'wheatdough': {'use': 'crafting material'},
                                    'graindough': {'use': 'crafting material'},
                                    'wheatflour': {'use': 'crafting material'},
                                    'grainflour': {'use': 'crafting material'},
                                    
                                    'grain': {'obtaining': 'grow from grain seed', 'use': 'craftable item'},
                                    'potato': {'obtaining': 'grow from seed', 'use': 'food'},
                                    'carrot': {'obtaining': 'grow from seed', 'use': 'food'},
                                    'food': {'use': 'crafting material, and its food'},
                                    'susfood': {'use': 'crafting material, and its food does damage to you'},
                                    'cookedfood': {'obtaining':'put food in campfire', 'use':'eating this heals 20 health'},
                                    
                                    'cookedmeat': {'obtaining': 'put food in campfire', 'use': 'food'},
                                    'cookedcarrot': {'obtaining': 'put food in campfire', 'use': 'food'},
                                    'cookedpotato': {'obtaining': 'put food in campfire', 'use': 'food'},
                                    'cereal': {'use': 'food'},
                                    'goldencookie': {'use': 'food'},
                                    'meat': {'obtaining': 'kill animals and monsters', 'use': 'food'},
                                    'rawfish': {'obtaining': 'kill water animals', 'use': 'food'},
                                    'drymeat': {'obtaining': 'put meat on shelf', 'use': 'food'},
                                    'cookedfish': {'obtaining': 'put food in campfire', 'use': 'food'},
                                    'mushroom': {'obtaining': 'get from darkland', 'use': 'food'},
                                    'bread': {'obtaining': 'flour in campfire', 'use': 'food'},
                                    'cookie': {'obtaining': 'grain dough in flour', 'use': 'food'},
                                    'cereal': {'use': 'food'},
                                    'rottenpotato': {'obtaining': 'when potato perishes in garden', 'use': 'food'},
                                    'cookedpotato': {'obtaining': 'put food in campfire', 'use': 'food'},
                                    'rottencarrot': {'obtaining': 'when carrot perishes in garden', 'use': 'food'},
                                    'cattail': {'obtaining': 'get from river', 'use': 'food'},
                                    'mussel': {'obtaining': 'from lakes', 'use': 'food'},
                                    'cookedmussel': {'obtaining': 'campfire', 'use': 'food'},
                                    'banana': {'obtaining': 'greenhouse with banana seed', 'use': 'food'},
                                    'milkbucket': {'obtaining': 'drink', 'use': 'food'},
                                    'manuer': {'obtaining': 'eat very tasty, or if u bad you could make fertilizer by put in composter', 'use': 'food'},
                                        
                                    'tulippaste': {'use': 'crafting medicine and potions'},
                                    'dandelionpaste': {'use': 'crafting medicine and potions'},
                                    'chickweedpaste': {'use': 'crafting medicine and potions'},
                                    'stingingnettlepaste': {'use': 'crafting medicine and potions'},

                                    'poisonessence': {'use': 'crafting item'},
                                    'benefactoressence': {'use': 'crafting item'},
                                    'volatileessence': {'use': 'crafting item'},
                                    'splashessence': {'use': 'crafting item'},
                                    'stunmix': {'use': 'stuns'},
                                    'stunsplash': {'use': 'splash stun'},
                                    'poisonmix': {'use': 'poisons'},
                                    'poisonsplash': {'use': 'splash poison'},
                                    'sightsplash': {'use': 'see in darkland areas'},
                                    'repellmix': {'use': 'repells enemies'},
                                    'smogmix': {'use': 'creates smog around thrown'},
                                    'hauntingsapling': {'use': ''},
                                    'growthmix': {'use': 'use on plants or make them grow faster'},
                                    'antipoisonmix': {'use': 'removes poison effect'},
                                    'buffmix': {'use': 'gives buffness effect'},
                                    'weaknessmix': {'use': 'makes enemies weak ( take more damage )'},
                                    'weaknesssplash': {'use': 'splash weakness'},
                                    'poisondrip': {'use': 'use to poison walls'},
                                }
                                    //stun, slow, weaken, poison, bleeding, invulnerability, damage reduction, daze-move randomly, rouge-attacking others, (effects stack like aoe for stun when potion)
                                    //efficiency-less acp, aoe potion effects, survivor-health<X do stuff, rage-potion effect powerup or trigger from consecutive hits, invisibility
                                    //further sight-seethrough, eating food buff, knockback enemies, find enemies, calls upon enemies, life steal, unconventional conversion
                                    //items which do extra effects when enemies has X effect, more drops

                                    //--attack class
                                    //

                                    //--gardening class
                                    //tree roots trap enemies
                                    //spirit of the forest-locate enemies in radius
                                    //assimilation-any enemies skill in range of smt will turn to players side attacking enemies
                                    //soul sucker-life steal
                                    //blood draining use for protection
                                    //necromancy for spawn animals anywhere

                                    //-architecture
                                    //-fence
                                    // - different levels of architecture which can get amterials faster or more efficiently
                                    // - miners for log iron etc.
                                    //animal fence
                                    //lumber mill
                                    //excavation mine
                                    //mystery pond drainer
                                    //
                                    //upgrading fences using updrage too
                                    //hole + scaffold + bricks = bunker
                                    //hole + mud = foundation
                                    //sand + floodbucket + iron = cement
                                    //foundation + scafold + [plank, brick, rock...] = tower
                                    //scafold + glass = greenhouse

                                    //probe on tower probe on mountain probe on animal

                                    //traders
                                    //general states decrease dmage dealt
                                    //cave dugout multi step construction
                                    //monster attack base

                                    // divinggear-invisible in water
                                    // spikes-damg on touch
                                    // landmine-explode on prox
                                    // guqin-counter daze(high chance miss), aoe radius, apply daze
                                    // battleaxe-high damage makes you fat go through armor
                                    // tecpatl-med damg, bleeding effect
                                    // blood totem-life steal with hitting bleeding enemy **
                                    // meatloaf-buff, heal      **cook
                                    // cursedstick-inflicts poison, low damage
                                    // hammer-depletes durability of enemy's items, med damg
                                    // tape-repairs **
                                    // bat-dazes, mid damg, no damg when enemy fat
                                    // spear-mid range, weak on sheild, high damg when enemy fat
                                    // icebomb-fattening, cannot use items, cannot move
                                    // magicpotion-random effect, used for crafting
                                    // multiknife-more knife more damg,
                                    // thornsarmor-everyhit inflicted by enemy retun back const no
                                    // exchanger-bleeding gives acp  **
                                    // boomerang-everydist same acp ??
                                    // soulboots-run faster when bleeding
                                    // trophy-hit a shot from dist away get acp (syn boomerang)  **
                                    // scope-increase accuracy when throwing or using ranged weapon
                                    // poisonedblood-crafing item teir 3  **
                                    // beastlyamulet-when close to death gain strength  **
                                    // trident-waterbreathing, no acp to use in water 
                                    // vampiricbite-gain acp next turn if not hit, low damg **
                                    // slipperyarmor-chance to dodge atk, against fat
                                    // garbagepick-broken items return to inv with 1 durability 
                                    // probe-see beyond obstructing things
                                    // nutcase-invulnerable for 1 turn
                                    // masochist-damg exchange strength  **
                                    // scythe-damg = damg dealt by bleeding
                                    // spyglass-see further in 1 dir, 1 use
                                    // scapper-get materials back when things break
                                    // resourseful-use less materials when crafting **
                                    // 暗器-low damge easy to craft low energy
                                    // brick-invulnerable to shark attacks
                                    // lantern-see in darkland;toggleable ene can also see me, 3 dur
                                    // phantom-fake changed alert pos with click  **
                                    // chest-any one can open
                                    // bowdart-med range, high eff poison
                                    // drunkenfumes-crafting material

                                    //thorns wall

                                    //possible strategies:
                                    //i know ene on M, M Weapons-bow range-accuracy-low acp; syn resourseful, scapper, garbagepick-me camo gas bomb with spy glasses
                                    //i know ene base behind river wall enclosed, throw bomb over wall, ene prepare with hole/escape; fatigue in water
                                    //darkland ambush intox me, right next to mountain so chance of going into darkland inc, disoriented 
    static items_states =           {
                                    'armor': {'durability': 6, 'block': {'sharp': .75, 'bludgen': 80}, 'blockeffect': {'bleeding': .3}, 'dursubper': 1/20},  //block effects
                                    'thornsarmor': {'durability': 5, 'block': {'sharp': .75, 'bludgen': 80}, 'blockeffect': {'bleeding': .2}, 'attack': 10, 'dursubper': 1/15},
                                    'fatarmor': {'durability': 6, 'block': {'sharp': .90, 'bludgen': 90}, 'blockeffect': {'bleeding': .6}, 'absorb_damage': 10, 'dursubper': 1/30},
                                    'pike': {'durability': 6, 'attack': 20, 'max_range': 2.5, 'action_points': 10, 'dursubbase': 2},
                                    'warhammer': {'durability': 6, 'radius': 4, 'max_damage': 30, 'action_points': 15},
                                    'baselard': {'affliction_duration': 4, 'attack': 12, 'action_points': 8},
                                    'shiv': {'attack': 12, 'action_points': 8, 'buff_duration': 10},
                                    'chain': {'durability': 6, 'affliction_duration': 2, 'attack': 5, 'action_points': 10, 'max_range': 10},
                                    'machete': {'durability': 6, 'attack': 20, 'action_points': 10, 'radius': 1.5, 'dash_range': 8, 'aoe_attack': 8, 'dash_action_point_ratio': .5},
                                    'crossbow': {'durability': 6, 'attack': 30, 'action_points': 10, 'max_range': 50},  //miss chance depends on range
                                    '暗器': {'attack': 15, 'action_points': 5, 'max_range': 30, 'affliction_chance': .25},
                                    'spike': {'heal': -20},
                                    '古琴': {'radius': 5, 'max_damage':20, 'action_points': 15},
                                    'battleaxe': {'attack': 40, 'action_points': 30},
                                    'scythe': {'dursubgrass': 1},
                                    'fisingspear': {'attack': 8, 'action_points': 10, 'durability': 10},
                                    
                                    'smog': {'poisoning_chance': .25, 'damage': 2, 'healmonster': 10},
                                    'grass': {'fist': ['grainSeed', 'wheatSeed'], 'dagger': ['grainSeed', 'dandelionSeed', 'wheatSeed', 'chickweedSeed'], 'scythe': ['wheatSeed', 'stingingnettleSeed', 'potatoSeed', 'carrotSeed', 'sapling']},
                                    'stick': {'fire_action_points': 20, 'make_fire_chance': .8},
                                    'tree': {'drop': [['wood', 2], ['leaf', 3]]},
                                    'witheredwillow': {'drop': [['witheredbark', 3]]},
                                    'sapling': {'grow_rounds': 5},
                                    'edentree': {'bushchance': .2},
                                    'edenbush': {'maxrounds': 100},
                                    'coral1': {'items': [['shard', 10], ['sponge', 2]]},
                                    'coral2': {'items': [['shard', 10], ['sponge', 2]]},

                                    'scaffold': {'health': 5, 'drop': [['stick', 1]]},
                                    'rockwall': {'health': 20, 'drop': [['smoothstone', 1]]},
                                    'brickwall': {'health': 30, 'drop': [['brick', 1]]},
                                    'wetcementwall': {'health': 20, 'drop': [['wetcement', 1]]},
                                    'cementwall': {'health': 40, 'drop': [['cement', 1]]},
                                    'ironwall': {'health': 50, 'drop': [['iron', 1]]},
                                    'woodenwall': {'health': 15, 'drop': [['plank', 1]]},

                                    'hammock': {'heal': 10, 'action_point_gain': 10},

                                    'fence': {'health': 15, 'drop': [['plank', 2]]},
                                    'fencegate': {'health': 20, 'drop': [['plank', 2]]},
                                    'gate': {'health': 40, 'drop': [['smoothstone', 2]]},
                                    'woodentower': {'health': 25, 'drop': [['plank', 1], ['woodenpillar', 1]]},
                                    'stonetower': {'health': 60, 'drop': [['smoothstone', 1], ['stonepillar', 1]]},
                                    'greenhouse': {'health': 30, 'storage_capacity': 40 },
                                    'window': {'health': 20, 'drop': [['glass', 2]]},
                                    'lumbermill': {'health': 50, 'storage_capacity': 30 },
                                    'mines': {'health': 100, 'storage_capacity': 40, 'oregeneration': [4, 6] },
                                    
                                    'plank': {},
                                    'thatch': {},
                                    'rope': {},    

                                    'fist': {'attack': 2, 'action_points': 5, 'get_seed_action_points': 10, 'get_seed_chance': .5, 'healthrockwall': 10, 'healthbrickwall': 10, 'healthcementwall': 10, 'healthwoodenwall': 5, 'healthcoral': 5, 'coraldamagechance': .25, 'getitemfromcoral': .3, 'attackwall': .5},
                                    'bow': {'attack': 15, 'action_points': 10, 'max_range': 20, 'durability': 7, 'dursub': 1},
                                    'arrow': {},
                                    'pebble': {'attack': 5},
                                    'snowball': {'attack': 1},
                                    'climbinggear': {'action_points': 15, 'durability': 3, 'dursubwall': 1, 'dursubm1': 2, 'dursubm2': 3},
                                    'ladder' : {'action_points': 10},
                                    'pickaxe' : {'attackonwall': 3, 'action_points': 20, 'attack': 1, 'harvestno': 3, 'attackonbase': 3, 'durability': 3, 'dursubwall': 1, 'dursubbase': 2, 'dursubene': 1, 'dursubmines':1}, // attack on walls
                                    'ironpickaxe': {'attackonwall': 3, 'action_points': 15, 'attack': 2, 'harvestno': 3, 'attackonbase': 3, 'durability': 10, 'dursubwall': 1, 'dursubbase': 2, 'dursubene': 1, 'dursubmines':1},
                                    'shovel' : {'action_points': 5, 'attack': 1, 'harvestno': 5, 'harvestnodirt': 1, 'durability': 3, 'dursubene': 1, 'dursubcol': 1},
                                    'ironshovel': {'action_points': 5, 'attack': 2, 'harvestno': 5, 'harvestnodirt': 1, 'durability': 10, 'dursubene': 1, 'dursubcol': 1},
                                    'axe': {'attackonwall': 3, 'action_points': 10,'attack': 4, 'durability': 5, 'dursubene': 1, 'dursubtree': 1, 'dursubwall': 1},
                                    'ironaxe' : {'action_points': 10,'attack': 4, 'durability': 15, 'dursubene': 1, 'dursubtree': 1},
                                    'dagger' : {'action_points': 5, 'attack': 7, 'attackonbase': 5, 'durability': 5, 'dursubene': 1, 'dursubgrass':1},
                                    'hoe': {'action_points': 10, 'attack': 3, 'durability': 7, 'dursubgarden': 1, 'dursubene': 3},
                                    'ironhoe': {'action_points': 10, 'attack': 5, 'durability': 30, 'dursubgarden': 1, 'dursubene': 3},
                                    'sponge': {'action_points': 10},
                                    'firestarter': {'fire_action_points': 5, 'make_fire_chance': .8, 'durability': 7},
                                    
                                    'food' : {'type': 'food', 'hunger_gain': 10, 'action_points_gain': [0, 5], 'perishing_rounds': 1},
                                    'cookedfood' : {'type': 'food', 'heal': 20, 'hunger_gain': 30, 'action_points_gain': [0, 10], 'perishing_rounds': 2},
                                    'susfood': {'type': 'food', 'heal': -20, 'hunger_gain': 10, 'action_points_gain': [0, 50, 0, -10, 0, -30], 'perishing_rounds': 4},  //remember every round gain 10 points
                                    'meat': {'type': 'food', 'heal': -5, 'hunger_gain': 30, 'action_points_gain': [0, 20, 5], 'perishing_rounds': 2},
                                    'rawfish': {'type': 'food', 'heal': -10, 'hunger_gain': 20, 'action_points_gain': [0, 20], 'perishing_rounds': 2},
                                    'drymeat': {'type': 'food', 'heal': 5, 'hunger_gain': 20, 'action_points_gain': [0, 10], 'perishing_rounds': 30},
                                    'cookedmeat': {'type': 'food', 'heal': 10, 'hunger_gain': 60, 'action_points_gain': [0, 30, 10, 5], 'perishing_rounds': 4},
                                    'cookedfish': {'type': 'food', 'heal': 5, 'hunger_gain': 30, 'action_points_gain': [0, 30], 'perishing_rounds': 4},
                                    'mushroom': {'type': 'food', 'heal': -20, 'hunger_gain': 5, 'poison_chance': .25, 'high_chance': .8},
                                    'bread': {'type': 'food', 'heal': 10, 'hunger_gain': 30, 'perishing_rounds': 20},
                                    'cookie': {'type': 'food', 'heal': 2, 'hunger_gain': 20, 'perishing_rounds': 100},
                                    'goldencookie': {'type': 'food', 'heal': 10, 'hunger_gain': 20, 'perishing_rounds': 100},
                                    'cereal': {'type': 'food', 'heal': 0, 'hunger_gain': 10, 'perishing_rounds': 100},
                                    'potato': {'type': 'food', 'heal': 5, 'hunger_gain': 10, 'perishing_rounds': 3},
                                    'rottenpotato': {'type': 'food', 'heal': -10, 'hunger_gain': 8, 'poison_chance': .25},
                                    'cookedpotato': {'type': 'food', 'heal': 5, 'hunger_gain': 30, 'perishing_rounds': 4},
                                    'carrot': {'type': 'food', 'heal': 0, 'hunger_gain': 5, 'perishing_rounds': 5},
                                    'cookedcarrot': {'type': 'food', 'heal': 5, 'hunger_gain': 20, 'perishing_rounds': 5},
                                    'rottencarrot': {'type': 'food', 'heal': -10, 'hunger_gain': 5, 'poison_chance': .25},
                                    'cattail': {'type': 'food', 'heal': 5, 'hunger_gain': 3},
                                    'mussel': {'type': 'food', 'heal': 5, 'hunger_gain': 5, 'perishing_rounds': 5},
                                    'cookedmussel': {'type': 'food', 'heal': 10, 'hunger_gain': 15, 'perishing_rounds': 5},
                                    'grain': {'heal_animal': 5},
                                    'banana': {'type': 'food', 'heal': 20, 'hunger_gain': 30, 'heal_animal': 10, 'perishing_rounds': 5},
                                    'milkbucket': {'type': 'food', 'heal': 20, 'hunger_gain': 20, 'perishing_rounds': 2},
                                    'manuer': {'type': 'food', 'heal': -100, 'hunger_gain': 0, 'sickness_chance': .01},

                                    'bandage': {'heal': 10},
                                    'rudimentaryheal': {'heal': 5},
                                    
                                    'sightsplash': {'radius': 3, 'craft_rounds': 3}, //includes not turn==this
                                    'stunmix': {},
                                    'stunsplash': {'radius': 3},
                                    'poisonmix': {'craft_rounds': 3},
                                    'poisonplash': {'radius': 3},
                                    'repellmix': {'repelldist': 5, 'craft_rounds': 3},
                                    'growthmix': {'speeduprounds': 3, 'craft_rounds': 3},
                                    'poisonessence': {'craft_rounds': 3},
                                    'benefactoressence': {'craft_rounds': 3},
                                    'volatileessence': {'craft_rounds': 3},
                                    'splashessence': {'craft_rounds': 3},
                                    'weaknessmix': {},
                                    'weaknesssplash': {'radius': 5},
                                    'actionmix': {'action_point_gain': 20},
                                    'mineralpill': {'animal_breed_chance_increase': .5, 'twin_chance': .2},
                                    'medicine': {'heal': 20},
                                    
                                    'scarecrow': {'destroy_chance': .3},
                                    
                                    'gasbomb': {'max_spread_dist': 5},
                                    'bomb' : {'explosion_ticks': 7, 'explosion_radius': 5, 'max_damage': 30},
                                    'snowbomb': {'radius': 5},
                                    'floodbucket': {'radius': 5},
                                    
                                    'beacon': {'health': 10, 'see_mult':2},
                                    'torch': {'perishing_rounds': 10, 'darkland_see_dist': 2},
                                    'lantern': {'perishing_rounds': 50, 'darkland_see_dist': 8},
                                    'binocular': {'extension': 3, 'durability': 5, 'see_dist': 5},
                                    
                                    'composter': {'health': 5, 'storage_capacity': 10},
                                    'campfire': {'health': 1, 'see_mult':1.5, 'storage_capacity': 5, 'base_alight_ticks': 200, 'fuel_values': {'stick': 20, 'leaf': 10, 'wood': 50}},
                                    'garden': {'storage_capacity': 10},
                                    'workbench': {'health': 10},
                                    'cauldron': {'health': 20, 'storage_capacity': 20},
                                    'drafter': {'health': 10},
                                    'smelter': {'health': 10, 'storage_capacity': 7},
                                    'shelf': {'health': 5, 'storage_capacity': 5, 'perish_percent': .8},
                                    'fishfeeder': {'storage_capacity': 10},
                                    'fridge': {'health': 20, 'storage_capacity': 10, 'perish_percent': .4},
                                    'backpack': {'storage_capacity': 20},
                                    'quiver': {'storage_capacity': 20},
                                    'chest': {'health': 10, 'storage_capacity': 10},
                                    'carcasscollector': {'storage_capacity': 10, 'radius': 5},

                                    'mudsmear': {'heal': 10},
                                    'cementsmear': {'heal': 15},

                                    }
    static general_states =         {
                                    'burning': {'damage': 5, 'lose_item_chance': .2, 'ticks': 10},
                                    'poison': {'damage': 2, 'ticks':48},
                                    'sickness': {'ticks': 200, 'hunger_loss': 2, 'action_point_loss': 1},
                                    'bleeding': {'damage': .5, 'ticks': 200},
                                    'drunk': {'ticks': 15, 'radius': 10},
                                    'stun': {'ticks': 5, 'undoable': ['move', 'craft', 'place', 'use']},
                                    'shiv_speed': {'action_point_mult': .7, 'ticks': Game_state.items_states['shiv']['buff_duration']},
                                    'weakness': {'ticks': 10, 'damaged_mult': 1.3},
                                    'freeze': {'ticks': 20, 'damaged_mult': 1.5, 'undoable': ['move']},
                                    }
    static player_effects =         {
                                    'broken_leg':{'round': 3, 'action_point_mult': 2},
                                    'broken_arm':{'round': 3, 'action_point_mult': 2},
                                    'fat':{'round': 4, 'action_point_mult': 1.2}, 
                                    'buff':{'round': 3, 'action_point_mult': 1.5},
                                    'dumb':{'round': 1, 'action_point_mult': 8},
                                    'high':{'round': 1, 'action_point_mult': .3},
                                    'dazed':{'round': 1, 'action_point_mult': 5},
                                    'tangled':{'round': 1, 'action_point_mult': 4},
                                    'encumbered':{'action_point_mult': 1.5},
                                    'hunger':{'action_point_mult': 1.5}
                                    }

    static explode = (bomb, bomb_rad = Game_state.items_states['bomb']['explosion_radius'], max_damage = Game_state.items_states['bomb']['max_damage']) => {
        let [start_x, start_y] = [bomb['position'][0] - bomb_rad, bomb['position'][1] - bomb_rad]
        start_x = max( min( start_x, width ), 0 )
        start_y = max( min( start_y, height ), 0 )
        bomb['exploded'] = true

        for ( let x=start_x;x<=bomb['position'][0]+bomb_rad&&x<=width-1;x++ ) {
            for ( let y=start_y;y<=bomb['position'][1]+bomb_rad&&y<=height-1;y++ ) {
                let env = game_state.environment[y][x]
                let dist = math.distance( [x, y], bomb['position'] )
                let dist_chance = (bomb_rad-dist)/bomb_rad

                if ( dist > bomb_rad ) continue

                //hit player
                if ( x == player_1.x && y == player_1.y ) {
                    player_1.health -= max_damage * dist_chance
                    random() < .5*dist_chance && (player_1.player_states['burning']['ticks'] = 0)
                    continue
                }
                else if ( x == player_2.x && y == player_2.y ) {
                    player_2.health -= max_damage * dist_chance
                    random() < .5*dist_chance && (player_2.player_states['burning']['ticks'] = 0)
                    continue
                }

                // is an array : mountains darklands 
                if ( env.constructor == Array ) {       //////////////////////////
                    switch (env[env.length-1]) {
                        case 'mountain1' : {
                            random() < .2*dist_chance && ( game_state.environment[y][x] = 'dirt' )
                            break
                        }
                        case 'moutain2' : {
                            random() < .1*dist_chance && ( game_state.environment[y][x] = ['mountain1'] )
                            break
                        }
                        case 'grass': {
                            random() < .8*dist_chance && ( game_state.environment[y][x] = 'dirt' )
                            break
                        }
                        case 'leaf' : 
                        case 'mushroom': 
                        case 'tulip':
                        case 'stick' : 
                        case 'mud' : 
                        case 'tree' :
                        case 'plank' : 
                        case 'lilypad':
                        case 'mussel': 
                        case 'cattail':
                        case 'leafcover' : {
                            random() < .5*dist_chance && ( game_state.environment[y][x].pop() )
                            break
                        }
                        case 'rock' : {
                            random() < .2*dist_chance && ( game_state.environment[y][x].pop() )
                            break
                        }
                    }
                    switch (env[0]) {
                        case 'leaf' : 
                        case 'stick' : 
                        case 'rock' : {
                            random() < .5*dist_chance && ( game_state.environment[y][x]='dirt' )
                            break
                        }
                    }
                    if ( env[0] == 'darkland' && random() < .8*dist_chance ) {                       //???????????????+++++++++++++++++++++++++++++++
                        env.length == 1 && (game_state.environment[y][x] = 'dirt') 
                    }

                    //         is object/ man made
                    env.forEach( (object, _) => {
                        if ( object.constructor == Object ) {   //cst for base is base
                            let damage = max_damage * dist_chance
                            let burn_ticks = Game_state.general_states['burning']['ticks']

                            object.health && game_state.heal_object(object, -damage, 'spread', undefined, [x, y])

                            env.length==1 && env[0] == 'dirt' && (game_state.environment[y][x] = 'dirt');

                            object.name == 'base' && random() < .5*dist_chance && (object.base_states['burning']['ticks'] = burn_ticks)
                            Object.keys(Game_state.animals).includes(object.name) && random() < .5*dist_chance && (object.states['burning'] = {'ticks': burn_ticks})
                        }
                    })                  
                    
                    env.length == 0 && (game_state.environment[y][x] = 'dirt')
                } else 
                switch (env) {         ////////////////////////////
                    case 'stick' : 
                    case 'leaf' : 
                    case 'mud' : 
                    case 'plank' : 
                    case 'stair' :
                    case 'mushroom' :
                    case 'leafcover' : {
                        random() < .5*dist_chance && ( game_state.environment[y][x] = 'dirt' )
                        break
                    }
                    case 'rock' : {
                        random() < .2*dist_chance && ( game_state.environment[y][x] = 'dirt' )
                        break
                    }
                    case 'dirt' : {
                        random() < .1*dist_chance && ( game_state.environment[y][x] = ['hole'] )
                        break
                    }
                    default : {
                        env != 'water' && (game_state.environment[y][x] = ['dirt'])
                    }
                }
                //                                fire 
                Math.random() < .5 * dist_chance && !env.includes('water') && !env.includes('quary') && ( env.constructor == Array ? !env.some(terrain=>{return terrain.constructor==Object}) : true ) && 
                ( (env.constructor == Array && !env.includes('fire')) ? game_state.environment[y][x] = [env[0], 'fire'] : game_state.environment[y][x] = ['dirt', 'fire'] )
            }
        }
        message = "EXPLODE!"
    }

    static aoe = (callback, pos, radius) => {
        for (let y = -radius; y<=radius; y++) {
            for (let x = -radius; x<=radius; x++) {
                if ( pos[0] + x >= width || pos[1] + y >= height || pos[0] + x < 0 || pos[1] + y < 0  ) continue

                math.distance([0, 0], [x, y]) <= radius && callback(player_1.evaluate_selection([pos[0]+x, pos[1]+y]), math.distance([0, 0], [x, y]), [pos[0]+x, pos[1]+y])
            }
        }
    }

    static nearest_object = (objects, origin, radius, return_obj=false) => {
        let nears = []

        Game_state.aoe((sel, dist, _) => {
            sel.constructor == Array ? 
            sel.some( t =>  { return objects.includes(t.name??t) && nears.push([t,dist]) } ) : 
            (objects.includes(sel) && nears.push([sel,dist]))
        }, origin, radius)

        nears.sort((obj1, obj2) => {return obj1[1] - obj2[1]})
        let nearest = nears[0]

        if ( nears.length != 0 ) { 
            if ( return_obj ) {
                return [nearest[0], nearest[1]]
            }
            return nearest[0]
        }
        if ( !return_obj ) {
            return false
        }
        return [false, []]
    }

    static get_level = terrain => {
        let levels = Game_state.levels
        let level

        for (let levelind = 0; levelind < levels.length; levelind++) {   //1-hole, 2-dirt, 3-m1, 4-m2
            
            (terrain.constructor == Array ? terrain.some(t => {return (t == 'hole' && terrain.includes('plank')) ? (level = 2, false) : levels[levelind].includes(t['name']??t)} ) : ( levels[levelind].includes(terrain['name']??terrain) || (level = 2, false) ) ) &&
            (level = levelind+1)
        } 
        return level
    }

    constructor ( width, height ) {
        this.environment = Array.apply(null, Array(height)).map(()=>{return Array(width).fill('dirt')})
        this.turn;
        this.day = true
        this.rounds_till_daynight = 10
        this.rounds = 0
        this.base_max_animals = Math.round(width*height/100)
        this.base_max_monsters = Math.round(width*height/200)
        this.max_animals = this.base_max_animals
        this.base_max_monsters = this.base_max_monsters
        this.event = ''
        this.rounds_till_event_end = 20

        this.landmines = []
        this.animals = []

        this.burning_objects = []

        this.environment_set_up()

        window.animal_move_interval = window.setInterval(this.move_animals, Game_state.move_animal_interval)
        window.environment_object_update_interval = window.setInterval(this.update_environment_objects_by_tick, 1000)
    }

    animals_length = () => {
        return this.animals.filter( animal => {return Game_state.passive_animals.includes(animal.name)} ).length
    }

    monsters_length = () => {
        return this.animals.filter( animal => {return Game_state.monsters.includes(animal.name)} ).length
    }

    update_environment_objects_by_tick = () => {
        var delete_objects_burning = []
        var delete_objects_environment = []
        //burning
        this.burning_objects.forEach(object => {
            if ( !object.burning ) {
                object.burning = {'ticks': Game_state.general_states['burning']['ticks']}
            }
            object.burning.ticks --
            if ( object.burning.ticks <= 0 ) {
                delete_objects_burning.push(object)
                delete object.burning 
                return
            }
            object.health -= Game_state.general_states['burning']['damage']
            object.health <= 0 && (delete_objects_burning.push(object), delete_objects_environment.push(object))
        })
        for (let i = this.burning_objects.length-1;i >= 0; i--) {
            if ( delete_objects_burning.includes(this.burning_objects[i]) ) {
                this.burning_objects.splice(i, 1)
            }
        }
        delete_objects_environment.forEach(object => {
            let terrain = this.environment[object.y][object.x]

            this.environment[object.y][object.x].splice(terrain.indexOf(object))
            this.fix_terrain_dearray(object.x, object.y)
        })
    }

    fix_terrain_dearray = (x, y) => {
        let terrain = this.environment[y][x]

        terrain.constructor == Array && terrain.length == 1 && (Game_state.environment_items.includes(terrain[0]) || terrain[0] == 'dirt') && (this.environment[y][x] = this.environment[y][x][0])
        terrain.constructor == Array && terrain == 'water' && (this.environment[y][x] = 'water')

        //arryify
        terrain.constructor != Array && ['darkland', 'mountain1', 'mountain2'].includes(terrain) && (this.environment[y][x] = [terrain])

        if ( terrain.constructor == Array && terrain.length == 0)debugger

    }

    is_hole = terrain => {
        return terrain.includes('hole') && !terrain.includes('plank')
    }

    heal_object = (object, health, evt, afflictor=undefined, pos=undefined) => {
        if ( Object.keys(Game_state.animals).includes(object.name) ) {
            this.heal_animal(object, health, evt, afflictor)
        }
        else if ( object.constructor == Player ) {
            object.heal(object, health, evt)
        }
        else {
            object.health += health

            if ( object.health <= 0 ) {
                object.name == 'workbench' && object.parent.workbenches.splice(object.parent.workbenches.indexOf(object), 1)
                object.name == 'cauldron' && object.parent.cauldrons.splice(object.parent.cauldrons.indexOf(object), 1)
                object.name == 'base' && object.parent.bases.splice(object.parent.bases.indexOf(object), 1)

                this.environment[pos[1]][pos[0]].splice(this.environment[pos[1]][pos[0]].indexOf(object), 1)
                this.fix_terrain_dearray(pos[0], pos[1])

                if ( Game_state.items_states[object['name']]['drop'] && afflictor ) {
                    let dropped_items = Game_state.items_states[object['name']]['drop']

                    dropped_items.forEach(entry => {afflictor.add_item(entry[0], entry[1])})
                }
            } 
        }
    }

    apply_buff_to_object = (object, buff, duration = undefined) => {
        if ( Object.keys(Game_state.animals).includes(object.name) ) {
            this.give_buff_to_animal(object, buff, duration)
        }
        else if ( object.constructor == Player ) {
            object.give_buff(buff, duration)
        }
    }

    terrain_effect = (object, map_terrain) => {
        if ( map_terrain.includes('spike') ) {
            this.heal_object(object, -Game_state.items_states['spike']['heal'], 'trap')
            message = 'fell into spiked hole trap'
            map_terrain.splice(map_terrain.indexOf('spike'), 1)
        }
        if ( map_terrain.includes('nettrap') ) {
            this.apply_buff_to_object(object, 'tangled')
            message = 'Entangled in a net!'
            map_terrain.splice(map_terrain.indexOf('nettrap'), 1)
        }   
        if ( map_terrain[map_terrain.length-2] == 'poison' ) {
            this.apply_buff_to_object(object, 'poison')
            map_terrain.splice(map_terrain.length-2, 1)
            return
        }
        else if ( map_terrain.includes('fire') ) {
            this.apply_buff_to_object(object, 'burning')
            map_terrain.splice(map_terrain.indexOf('fire'), 1)
            message = 'ur alighteth, don\'t touch fire eh'
        }
    }

    give_buff_to_animal = (animal, buff, duration = undefined) => {
        animal.states[buff] = {'ticks': duration??Game_state.general_states[buff]['ticks']}
    }

    heal_animal = (animal, health, evt, afflictor = undefined) => {
        let damage_mult = 1
        
        Object.keys(animal.states).forEach(state => {
            Game_state.general_states[state] && Game_state.general_states[state]['damaged_mult'] && (damage_mult *= Game_state.general_states[state]['damaged_mult'])
            Game_state.player_effects[state] && Game_state.player_effects[state]['damaged_mult'] && (damage_mult *= Game_state.player_effects[state]['damaged_mult'])
        })
        animal.health += health 

        animal.health <= 0 && this.kill_animal(animal, afflictor) 
    }

    displace_environment = animal => {
        let x = animal['pos'][0], y = animal['pos'][1]
        let terrain = game_state.environment[y][x]

        try{this.environment[y][x].splice(terrain.indexOf(animal), 1)}catch{debugger}
        this.fix_terrain_dearray(x, y)
    }

    kill_animal = (animal, player=undefined) => {
        this.displace_environment(animal)
        this.animals.splice(this.animals.indexOf(animal), 1)

        let [pos, carcasscollector] = Game_state.nearest_object('carcasscollector', animal.pos, Game_state.items_states['carcasscollector']['radius'], true)

        if ( pos ) {
            Object.entries(Game_state['animals'][animal.name]['drop']).forEach( entry => { carcasscollector.items.length < carcasscollector.max && carcasscollector.items.push( {'name': entry[0], 'round': 0} ) } )
        }
        else if ( player ) {
            Object.entries(Game_state['animals'][animal.name]['drop']).forEach( entry => { player.add_item( entry[0], entry[1] ) } )
            message = 'killed animal'
        }
    }

    despawn_animals = () => {
        clearInterval(window.animal_move_interval)

        if ( this.day ) {
            for (let index = this.animals.length-1; index >= 0; index--) {
                let animal = this.animals[index]
                if ( animal['day'] || math.distance(animal.pos, [player_1.x, player_1.y]) < 10 || math.distance(animal.pos, [player_2.x, player_2.y]) < 10  ) continue
                
                this.kill_animal(animal)
            }
        }
        else {
            for (let index = this.animals.length-1; index >= 0; index--) {
                let animal = this.animals[index]
                if ( !animal['day'] || math.distance(animal.pos, [player_1.x, player_1.y]) < 10 || math.distance(animal.pos, [player_2.x, player_2.y]) < 10  ) continue
                
                !animal.fed && random() <= Game_state.day_animal_night_despawn_chance && this.kill_animal(animal)
            }
        }
        if ( this.animals.length >= this.max_animals/1.2 ) {
            this.animals.sort( (a1, a2) => {
                let min_dist_a2 = min(math.distance(a2.pos, [player_1.x, player_1.y]), math.distance(a2.pos, [player_2.x, player_2.y]))
                let min_dist_a1 = min(math.distance(a1.pos, [player_1.x, player_1.y]), math.distance(a1.pos, [player_2.x, player_2.y]))

                return min_dist_a2 - min_dist_a1
            })
            this.kill_animal(this.animals.filter(animal=>{return !animal.fed})[0])
        }

        window.animal_move_interval = window.setInterval(this.move_animals, Game_state.move_animal_interval)
    }

    push_animal = (x, y, animal_name) => {
        let animal_vars = Game_state.animals[animal_name]
        let animal = {'name': animal_name, 'pos':[x, y], 'ticks': animal_vars['tickspermove'], 'health': animal_vars['health'], 'states': {}, 'day': animal_vars['day'], 'previous_position': [0, 0]}
        this.environment[y][x].constructor == Array ? this.environment[y][x].push(animal) : this.environment[y][x] = [this.environment[y][x], animal]
        this.animals.push(animal)

        return animal
    }

    generate_animals = () => {
        if ( this.animals.length >= this.max_animals ) return

        let max_animals_spawn = this.day ? abs(this.get_event_mult('passivemob_spawn_mult') * (this.max_animals-this.animals_length()) / 2) : this.get_event_mult('nonpassivemob_spawn_mult') * (this.base_max_monsters-this.monsters_length()) 

        for (let index = 0; index < max_animals_spawn; index++) {
            if ( this.animals.length > this.max_animals ) return

            let [x, y] = [int(random() * width), int(random() * height)]

            if ( math.distance([x, y], [player_1.x, player_1.x]) < 15 || math.distance([x, y], [player_2.x, player_2.x]) < 15 ) continue

            let terrain = this.environment[y][x]
            let spawnable_animals = [];

            let is_spawn_terrain = (terrain, values) => {return values['spawn_terrain'].some(t=>{return terrain.includes(t)})}
            
            Object.entries(Game_state.animals).forEach( ([animal_name, values]) => { //cow': {'radius': [3, 5], 'drop': {'meat': 2, 'bone': 1}, 'health': 20, 'tickspermove': 6, 'spawn_terrain': ['dirt'], 'relative_spawn_chance': 5, 'day': boolean}
                if ( is_spawn_terrain(terrain, values) && (values['day'] == this.day || values['day'] == 'both') && this.rounds >= (values['rounds_till_spawn']??0) ) 
                for (let i=0;i<values['relative_spawn_chance'];i++){spawnable_animals.push(animal_name)} 
            } )  

            if ( spawnable_animals.length == 0 ) continue
            
            var animal_name = spawnable_animals[ getRandomInt(spawnable_animals.length) ]
            var animal_vars = Game_state.animals[animal_name]

            if ( Game_state.monsters.includes(animal_name) && player_1.bases.concat(player_2.bases).some( base => { return math.distance([base.x, base.y], [x, y]) <= 30 } ) ) continue

            if ( animal_vars['packsizemax'] ) {
                let possible_positions = []
                let pack_size = max(getRandomInt(animal_vars['packsizemax']+1), animal_vars['packsizemin'])
                
                Game_state.aoe((sel, dist, pos) => {
                    let sel_spawnable = sel.constructor==Array ? is_spawn_terrain(sel, animal_vars) : sel == 'dirt'
                    
                    sel_spawnable && dist <= 3 && dist > 1.5 && possible_positions.push(pos)
                }, [x, y], 3)

                if ( possible_positions.length == 0 ) return

                for (let i=0;i<=pack_size;i++) {
                    let [animalx, animaly] = random(possible_positions)

                    if ( !is_spawn_terrain(this.environment[animaly][animalx], animal_vars) ) continue
                    
                    this.push_animal(animalx, animaly, animal_name)
                }
                
                if ( animal_name == 'knave' ) {
                    let campfire = {'name': 'campfire', 'health': Game_state.items_states['campfire']['health'], 'items': [], max: Game_state.items_states['campfire']['storage_capacity']}  
                    this.environment[y][x] = ['dirt', campfire]
                }
                else if ( animal_name == 'bandit' ) {
                    let structure = [['r', 'r', 'r'], ['r', 'c', 'r'], ['r', 'r', 'r']]
                    let rockwall = {'name': 'rockwall', 'health': Game_state.items_states['rockwall']['health']}
                    let chest = {'name': 'chest', 'health': Game_state.items_states['chest']['health'], 'items': []}
                    for (let i=random()*animal_vars['lootmax'];i>=0;i--) chest.items.push({'name': random(animal_vars['loot']), 'rounds': 0})

                    structure.forEach((h, y)=>{h.forEach((t, x)=>{structure[y][x] = structure[y][x]=='r'?rockwall:chest})})

                    Game_state.aoe((sel, _, pos) => {
                        if ( !sel.includes('mountain1') && !sel.includes('mountain2') ) return

                        let relative = [pos[0]-x, pos[1]-y]

                        this.environment[pos[1]][pos[0]].splice(1, 0, structure[relative[1]+1][relative[0]+1])


                    }, [x, y], 1)
                }
            }
            else {
                this.push_animal(x, y, animal_name)
            }
            
        }
    }
    
    move_animals = () => {     
        var animal_move_in_proximity = false  
        var attack_heal_animals = []
        
        for (let index=this.animals.length-1; index>=0; index --) {
            var animal = this.animals[index]
            try{var [x, y] = animal['pos']}catch{debugger}
            var animal_vars = Game_state.animals[animal.name]
            
            if ( animal.name == 'doctor' ) {
                let delete_smog = []

                animal.smog && animal.smog.forEach(smog => {
                    smog.ticks -= Game_state.move_animal_interval/1000

                    if ( smog.ticks <= 0 ) {
                        this.environment[smog.y][smog.x].splice(this.environment[smog.y][smog.x].indexOf(smog), 1)
                        this.fix_terrain_dearray(smog.x, smog.y)
                        delete_smog.push(smog)
                    }
                })

                if ( delete_smog.length ) {
                    for (let i=animal.smog.length-1;i>=0;i--) {
                        if ( delete_smog.includes(animal.smog[i]) ) {
                            animal.smog.splice(i, 1)
                        }
                    }
                }
            }
            if ( animal.name == 'fish' || animal.name == 'shark' ) {
                let terrain = this.environment[animal.pos[1]][animal.pos[0]]

                if ( !terrain.includes('water') ) {
                    this.heal_animal(animal, -10*Game_state.move_animal_interval/1000, 'drowning')
                    continue
                }
            }
            if ( animal.name.includes('baby') && !animal.states['baby'] ) {
                animal.states['baby'] = {'ticks': animal_vars['ticks_growup']}
            }
            Object.keys(animal['states']).forEach( state => {  //update animal states -> burning
                animal['states'][state]['ticks'] && (animal['states'][state]['ticks'] -= Game_state.move_animal_interval/1000)
                
                if ( animal['states'][state]['ticks'] <= 0 ) {
                    delete animal['states'][state] 

                    if ( state == 'baby' ) {
                        animal.health = -1

                        let animal_name = animal.name.replace('baby', '')
                        let [x, y] = [animal.pos[0], animal.pos[1]]
                        
                        game_state.push_animal(x, y, animal_name)
                    }
                    return
                }

                switch (state) {
                    case 'burning': {
                        this.heal_animal(animal, -Game_state.general_states['burning']['damage'], 'burning')
                        break
                    }
                    case 'poison': {
                        this.heal_animal(animal, -Game_state.general_states['poison']['damage'], 'poison')
                        break
                    }
                }
            }) 

            if ( animal.health <= 0 ) {
                this.kill_animal(animal)
                continue
            }

            if ( animal['ticks'] > 0 ) {
                animal['ticks'] --
                continue
            }

            if ( animal.fed ) {
                random() < .01 && (animal.fed = false)
            }

            animal['ticks'] = Game_state.animals[animal['name']]['tickspermove']

            var previous_terrain = this.environment[y][x]
            let min_rad = animal_vars['radius'][0], max_rad = animal_vars['radius'][1]
            var move_radius = random() * (max_rad-min_rad) + min_rad
            var animal_see_range = animal_vars['see_range']
            var player = this.turn

            let dist_from_player = math.distance([x, y], [player.x, player.y])
            let player_in_see_range = dist_from_player <= animal_vars['see_range']
            let player_in_darkland = player.current_map_terrain.includes('darkland')
            let player_seeable = (Game_state.darkland_sight_animals.includes(animal.name) || !player_in_darkland) && (player.items['lionpelt'] && Game_state.lionpelt_unseeable_animals.includes(animal.name) || !player.items['lionpelt'])
            let player_next_to_base = player.dist_from_bases() < 2
            var attack_player = player_in_see_range && player_seeable && !player_next_to_base

            var closest_base = player_1.bases.concat(player_2.bases).sort((base1, base2) => {return math.distance([base1.x, base1.y], [x, y])-math.distance([base2.x, base2.y], [x, y])})[0]
            var base_dist = closest_base?math.distance([closest_base.x, closest_base.y], [x, y]):Infinity
            var base_in_proximity = base_dist < 50 //... hidden base
            
            if ( this.is_hole(previous_terrain) ) {
                if ( Game_state.holeable_animals.includes(animal.name) ) {
                    if ( random() > (animal_vars['escape_hole_chance']??0) )
                    continue
                }
            }
            if ( animal.states['stun'] && animal.states['stun']['ticks'] ) {
                continue
            }
            if ( animal.states['tangled'] && animal.states['tangled']['ticks'] ) {
                continue
            }

            let towards = object => {
                let animal_to_object = [object.x-x, object.y-y]
                let moving_position = [greatest_dot([x, y], moveable_area, animal_to_object)]
                
                return moving_position
            }
            let away = object => {
                let object_to_animal = [x-object.x, y-object.y]
                let moving_position = [greatest_dot([x, y], moveable_area, object_to_animal)]
                
                return moving_position
            }
            let sort_closest = positions => {
                if ( positions[0].name == 'node' ) {
                    var closest_travel_area = positions.sort((nodea, nodeb) => { 
                        let [nodeadist, nodebdist] = [math.distance(nodea.position, [x, y]), math.distance(nodeb.position, [x, y])]
                        return nodeadist-nodebdist
                    })
                    let closest_node = closest_travel_area[0]

                    return closest_node
                }
                else {
                    var closest_travel_area = positions.sort( (posa, posb) => { return math.distance(posa, [x, y]) - math.distance(posb, [x, y]) }) 
                    return closest_travel_area[0]
                }
            }
            let eat_from_environment = (pos, eat_chance, food) => {
                if ( math.distance(pos, [x, y]) <= 1.5 && random() < eat_chance ) {
                    let env = this.environment[pos[1]][pos[0]]
                    env = env[env.length-1]
                    
                    env.items ? env.items.splice(env.items.map(food=>{return food.name}).indexOf(food), 1) : this.environment[pos[1]][pos[0]].splice(this.environment[pos[1]][pos[0]].indexOf(food), 1), animal.fed = true
                    game_state.fix_terrain_dearray(pos[0], pos[1])
                    moveable_area = [moveable_area[0]]
                } 
                else 
                moveable_area = towards({'x':pos[0], 'y':pos[1]})          
            }

            var towards_scarecrow = () => {
                if ( move_towards_remove('scarecrow', Game_state.items_states['scarecrow']['destroy_chance']) ) return true
            }

            var attack_base = () => {
                if ( !base_in_proximity ) return

                if ( closest_base.parent != player || this.rounds < Game_state.rounds_till_attackbase ) return

                if ( base_dist < animal_vars['attack_range'] ) {
                    closest_base.damage(animal_vars['attack'], animal_vars['attack_type'])

                    message = `base getting damaged health: ${closest_base.health}`

                    if ( animal.name == 'cinder' ) {
                        random() > animal_vars['light_terrain_chance'] && closest_base.give_buff('burning')
                    }
                } else
                moveable_area = towards(closest_base)

                return true
            }

            var attack_animal = animals => {
                var closest_animal = Game_state.nearest_object(animals, [x, y], animal_see_range)
                var closest_animal_dist = closest_animal && math.distance([closest_animal.pos[0], closest_animal.pos[1]], [x, y])

                if ( typeof closest_animal_dist == 'number' && closest_animal_dist <= animal_vars['animal_seerange'] ) {
                    if ( closest_animal_dist < 1.5 ) {
                        Object.keys(Game_state.animals).includes(closest_animal.name) && attack_heal_animals.push([closest_animal, animal_vars['attack_type'], animal_vars['attack']]) 
                        moveable_area = [moveable_area[0]]
                        return true
                    }
                    moveable_area = towards({'x': closest_animal.pos[0], 'y': closest_animal.pos[1]})
                    return true
                }
            }

            var eat_food = () => {
                let foods = Object.keys(animal_vars['eatfoodchance'])
                let closest_food
                let closest_pos = [Infinity, Infinity]
                let storedin

                Game_state.aoe( (sel, _, pos) => {
                    if ( math.distance(pos, [x, y]) > math.distance(closest_pos, [x, y]) ) return

                    foods.forEach( ediblefood => {
                        let insides = Object.keys(animal_vars['eatfoodchance'][ediblefood])

                        insides.forEach( object => {
                            if ( object == 'shelf' ) {
                                storedin = 'shelf'
                                sel[sel.length-1].name == 'shelf' && sel[sel.length-1].items.some(food=>{return food.name == ediblefood && (closest_food = ediblefood, closest_pos = pos)}) 
                            }
                            else if ( object == 'garden' ) {
                                storedin = 'garden'
                                sel[sel.length-1].name == 'garden' && sel[sel.length-1].items.some(crop=>{return crop.name == ediblefood && (closest_food = ediblefood, closest_pos = pos)}) 
                            }
                        })

                        storedin = 'ground'
                        sel.constructor==Array && sel.some( t => { return (t.name??t) == ediblefood && (closest_food = ediblefood, closest_pos = pos) } ) 
                    })

                }, [x, y], animal_vars['food_seerange'])


                if ( closest_food ) {
                    let chance = animal_vars['eatfoodchance'][closest_food][storedin]
                    
                    eat_from_environment(closest_pos, chance, closest_food)

                    return true
                }
            }             /////////////////////////////////////maybe broken

            var move_straight = () => {
                moveable_area.length > 1 && moveable_area.shift()
                moveable_area = away({'x': animal.previous_position[0], 'y': animal.previous_position[1]})
                animal.previous_position = [x, y]
                return true
            }

            var move_away_from_object = objects => {
                var near_pos = Game_state.nearest_object(objects, [x, y], animal_see_range) 

                if ( near_pos ) {          
                    debugger          
                    moveable_area = away({'x': near_pos[0], 'y': near_pos[1]})

                    return true
                }
            }

            var move_towards = objects => {
                var near_pos = Game_state.nearest_object(objects, [x, y], animal_see_range) 

                if ( near_pos ) {                    
                    moveable_area = towards({'x': near_pos[0], 'y': near_pos[1]})

                    return true
                }
            }

            var move_towards_remove = (object, remove_chance) => {
                var nearest_object = Game_state.nearest_object([object], [x, y], animal_see_range)

                if ( nearest_object ) {
                    if ( math.distance(nearest_object, [x, y]) < 1.5 ) {
                        random() < remove_chance && this.environment[nearest_object[1]][nearest_object[0]].splice(previous_terrain.indexOf(object))
                        this.fix_terrain_dearray(nearest_object[0], nearest_object[1])

                        return true
                    }
                    moveable_area = towards({'x': nearest_object[0], 'y': nearest_object[1]})
                    
                    return true
                }
            }

            var hit_player = mes => {
                player.heal(-animal_vars['attack'], animal_vars['attack_type']), random() <= animal_vars['affliction_chance'] && player.give_buff(animal_vars['affliction']), moveable_area = [moveable_area[0]], message = mes, animal.attacked = true
            }

            var moveable_area = game_objects.spread(x, y, '', [], move_radius, false, animal_vars['moveable_terrain'])
            
            switch (animal.name) {   // how the animal moves
                case 'babygoat':
                    if ( !animal.states['baby'] ) {
                        animal.states['baby'] = {'ticks': animal_vars['ticks_growup']}
                }
                case 'goat': {
                    if ( animal.lassoed ) {
                        moveable_area = towards(player)
                    }

                    eat_food(['shelf', 'garden'])

                    break
                }
                case 'reveller': {
                    if ( attack_animal(Game_state.monsters) ) break

                    if ( move_towards(['goat']) ) break

                    break
                }
                case 'ape': {
                    if ( attack_animal(Game_state.monsters, 'sharp') ) break

                    if ( eat_food(['shelf', 'garden']) ) break

                    if ( move_towards(['trophy']) ) break

                    if ( random() < .6 && move_towards(['ape']) ) break

                    break
                }
                case 'babycow': 
                    if ( !animal.states['baby'] ) {
                        animal.states['baby'] = {'ticks': animal_vars['ticks_growup']}
                }
                case 'cow': {
                    if ( animal.lassoed ) {
                        moveable_area = towards(player)
                        break
                    }
                    if ( animal.fed == undefined ) {
                        animal.fed = false
                    }

                    eat_food(['shelf', 'garden'])

                    break
                }
                case 'babyfish': 
                    if ( !animal.states['baby'] ) {
                        animal.states['baby'] = {'ticks': animal_vars['ticks_growup']}
                    }
                case 'fish': {
                    if ( move_away_from_object(['shark']) ) break

                    if ( eat_food(['fishfeeder']) ) break

                    move_straight()
                    break
                }
                case 'shark': {
                    if ( animal.lassoed ) {
                        moveable_area = away(player)

                        break
                    }

                    if ( animal.attacked == undefined ) {
                        animal.attacked = false
                    }
                    if ( animal.submerged == undefined ) {
                        animal.submerged = true
                    }
                    if ( animal.attacked ) {
                        random() < .5 && (animal.attacked = false)
                    }

                    if ( attack_animal(['fish']) ) break

                    if ( eat_food([]) ) break

                    dist_from_player < animal_vars.surface_dist ? (animal.submerged = false) : (animal.submerged = true)

                    if ( attack_player && !animal.attacked || player.has_state('bleeding') ) {
                        if ( dist_from_player <= 1.5 && player.current_map_terrain.includes('water') ) {
                                hit_player('prayed by shark')
                            }
                            else {
                            moveable_area = towards(player)
                        }
                        break
                    }

                    if ( attack_base() ) break

                    animal.submerged = true
                    
                    move_straight()
                    break
                }
                case 'angrybird':
                case 'hairyboi':
                case 'deceiver':
                case 'shrill':
                case 'charred':
                case 'abadee':
                case 'lion': {
                    if ( towards_scarecrow() ) break

                    if ( eat_food() ) break

                    if ( attack_player ) {
                        if ( dist_from_player <= 1.5 && player.same_level('dirt') ) {

                            hit_player('mauled')
                        }
                        else {
                            moveable_area = towards(player)
                        }
                        break
                    }

                    if ( attack_base() ) break

                    break
                }
                case 'forestspirit': {
                    Game_state.aoe((_, 一, pos) => {
                        let env = this.environment[pos[1]][pos[0]]

                        if ( env.constructor!=Array ? !animal_vars['overwriteterrain'].includes(env.name??env) : !env.every(t=>{return animal_vars['overwriteterrain'].includes(t.name??t)}) ) return
                        
                        if ( env.constructor == Array && env.includes('grass') ) {
                            random() < animal_vars['grow_tree_chance'] && (this.environment[pos[1]][pos[0]] = ['dirt', 'grass', 'tree'])
                            return
                        }

                        random() < .8 && (this.environment[pos[1]][pos[0]] = ['dirt', 'grass'])

                    }, [x, y], 1)

                    if ( animal['agro'] ) {
                        if ( attack_player ) {
                            if ( dist_from_player <= 1.5 && player.same_level('dirt') ) {player.heal(-animal_vars['attack'], 'sharp'), random() <= animal_vars['affliction_chance'] && player.give_buff('tangled'), moveable_area = [moveable_area[0]], message = 'ensnared by forest spirit'}
                            else {
                                moveable_area = towards(player)
                            }
                        }
                        else {
                            random() < .5 && (animal['agro'] = false)
                        }
                    }
                    break
                }
                case 'ravenger': {
                    if ( towards_scarecrow() ) break
                    
                    if ( attack_player ) {
                        if ( dist_from_player <= 1.5 && player.same_level('dirt') ) {
                            hit_player('smashed by ravenger')
                        }
                        else {
                            moveable_area = towards(player)
                        }
                    }

                    if ( attack_animal(['cow', 'lion']) ) break

                    if ( eat_food(['shelf']) ) break

                    if ( attack_base() ) break

                    break
                }
                case 'bandit': {
                    if ( towards_scarecrow() ) break

                    if ( move_towards_remove('trophy', animal_vars['take_trophy_chance']) ) break

                    if ( attack_player ) {
                        if ( dist_from_player <= 1.5 && (player.same_level(['mountain1'])||player.same_level(['mountain2'])) ) {
                            hit_player('gangumed by bandits')
                        }
                        else {
                            moveable_area = towards(player)
                        }
                        break
                    }
                    
                    if ( move_towards(['chest']) ) break
                    
                    if ( attack_base() ) break

                    break
                }
                case 'knave': {
                    if ( towards_scarecrow() ) break
                    
                    if ( attack_player ) {
                        if ( dist_from_player <= 1.5 && player.same_level('dirt') ) {
                            hit_player('ganged by knave')
                        }
                        else {
                            moveable_area = towards(player)
                        }
                        break
                    }

                    if ( move_towards(['campfire']) ) break
                
                    if ( attack_base() ) break

                    break
                }
                case 'berserker': {
                    Game_state.aoe((_, 一, pos) => {  //aoe smash attack
                        let env = this.environment[pos[1]][pos[0]]
                        if ( env.constructor != Array || pos[0] == x && pos[1] == y || env.some(t=>{return Game_state.monsters.includes(t.name) }) ) return 
                        
                        let object = env.filter(t=>{return typeof t == 'object'})[0] 

                        object && this.heal_object(object, -animal_vars['aoe_smash_attack'], 'bludgen', undefined, pos)
                    }, [x, y], animal_vars['aoe_smash_radius'])

                    if ( attack_player ) {        
                        if ( dist_from_player <= 1.5 ) {
                            hit_player('smooooshed by berserker')
                            
                            if ( random() < animal_vars['knockback_chance'] ) {
                                let knockbackable_area = []
                                let to_player = [player.x-x, player.y-y]
                                let to_player_dist = math.distance(to_player, [0, 0])
                                let dist_multiplier = animal_vars['median_knockback_radius']/to_player_dist
                                let mid_from_player = [x+to_player[0]*dist_multiplier, y+to_player[1]*dist_multiplier]

                                Game_state.aoe((sel, _, pos) => {
                                    sel.constructor != Array && (sel = [sel])
                                    
                                    if ( sel.every(t => { return Game_state.landable_terrain.includes(t.name??t) } ) ) {
                                        knockbackable_area.push(pos)
                                    }
                                }, mid_from_player, animal_vars['median_knockback_radius'])

                                player.displace(...random(knockbackable_area))
                            }
                        }
                        else {
                             moveable_area = towards(player)
                        }
                        break
                    }
                    if ( attack_base() ) break

                    break

                }
                case 'bewitched': {
                    Game_state.aoe((sel, 一, pos) => {
                        if ( random() < .5 ) return

                        sel.constructor != Array && (sel = [sel])
                        if ( !sel.every(t=>{return animal_vars['corruptable_terrain'].includes(t) }) ) return

                        this.environment[pos[1]][pos[0]] = ['dirt', 'crimsonroot']

                    }, [x, y], animal_vars['rooting_radius'])

                    var [wall_pos, wall_close] = Game_state.nearest_object(['woodenwall', 'brickwall', 'rockwall', 'fence', 'fencegate'], [x, y], 1)

                    if ( wall_close.length != 0 ) {
                        wall_close = random(wall_close)
                        wall_pos = [wall_close.x, wall_close.y]

                        this.heal_object(wall_close, animal_vars['attack'], 'sharp', undefined, wall_pos)
                        break
                    }

                    if ( attack_player ) {
                        if ( dist_from_player <= 1.5 ) {
                            hit_player('bewitched')
                        }
                        else {
                            moveable_area = towards(player)
                        }
                        break
                    }
                    if ( attack_base() ) break

                    break
                }
                case 'shrieker': {
                    if ( towards_scarecrow() ) break
                    
                    if ( attack_player ) {
                        if ( dist_from_player <= animal_vars['attack_range'] ) {
                            hit_player('pierced by shrieker')
                        }
                        else {
                            moveable_area = towards(player)
                        }
                    }
                    if ( attack_base() ) break

                    break

                }
                case 'cinder': {
                    Game_state.aoe((sel, _, pos) => {  //dry up water
                        if ( !sel.includes('water') || pos[0] == x && pos[1] == y ) return

                        sel.constructor == Array ? sel[0] == 'water' ? this.environment[pos[1]][pos[0]] = 'dirt' : this.environment[pos[1]][pos[0]] = [sel[0]] : this.environment[pos[1]][pos[0]] = 'dirt' 
                    }, [x, y], 1)

                    if ( towards_scarecrow() ) break
                    
                    if ( attack_player ) {
                        if ( dist_from_player <= animal_vars['attack_range'] ) {
                            hit_player('scorched by cinder')

                            if ( random() < animal_vars['throw_flame_chance'] ) {
                                let to_player = [player.x-x, player.y-y]
                                let mid_from_player = [x+round(to_player[0]/2), y+round(to_player[1]/2)]

                                Game_state.aoe((sel, _, pos) => {
                                    if ( random() > animal_vars['light_terrain_chance'] || pos[0] == x && pos[1] == y ) return

                                    let terrain = this.environment[pos[1]][pos[0]]

                                    if ( sel.constructor == Array ) {
                                        if ( sel.map(t=>{return t.name}).includes('woodenwall')) debugger
                                        let burnable_object = sel.filter(t=>{return Game_state.burnable_terrain.includes(t.name??t)})[0]
                                        if ( burnable_object)debugger
                                        
                                        burnable_object && ( burnable_object.constructor == Object ? this.burning_objects.push(burnable_object) : this.environment[pos[1]][pos[0]].splice(terrain.indexOf(burnable_object), 1) )
                                        this.fix_terrain_dearray(pos[0], pos[1])
                                    } 
                                    if ( sel == 'dirt' || (sel.length == 2 && sel[1] == 'grass') ) {
                                        if ( this.environment[pos[1]][pos[0]].includes(animal))debugger
                                        this.environment[pos[1]][pos[0]] = ['dirt', 'fire']
                                    }
                                    if ( sel.includes('tree') && random() < .3 ) {
                                        if ( this.environment[pos[1]][pos[0]].includes(animal))debugger
                                        this.environment[pos[1]][pos[0]] = ['dirt', 'fire']
                                    }
                                }, mid_from_player, animal_vars['light_terrain_radius'])
                            }
                        }
                        else {
                            moveable_area = towards(player)
                        }
                        break
                    }
                    if ( attack_base() ) break

                    break
                }
                case 'phantom': {
                    if ( !animal.morph ) {
                        animal.morph = 'phantom'
                    }

                    if ( dist_from_player <= animal_vars['morph_range'] && animal.morph == 'phantom' ) {
                        animal.morph = random(animal_vars['morphable_objects'])
                    } 
                    if ( attack_player ) {
                        if ( dist_from_player <= animal_vars['attack_range'] ) {
                            hit_player('blighted by phantom')
                        }
                        else {
                            moveable_area = towards(player)
                        }
                        break
                    }
                    if ( animal.morph != 'phantom' ) {
                        animal.morph = 'phantom'
                    }

                    if ( attack_base() ) break

                    break
                }
                case 'doctor': {
                    Game_state.aoe((_, 一, pos) => {
                        let env = this.environment[pos[1]][pos[0]]

                        if ( Game_state.get_level(env) != 2 ) return
                        
                        if ( env.length == 2 && env.includes('grass') ) {
                            random() < animal_vars['kill_grass_chance'] && (this.environment[pos[1]][pos[0]] = 'dirt')
                        }
                        else if ( env.length == 3 && env.includes('tree') ) {
                            random() < animal_vars['kill_tree_chance'] && (this.environment[pos[1]][pos[0]] = ['dirt', 'witheredwillow'])
                        }
                        
                        if ( env.constructor == Array && env.map(t=>{return t.name}).includes('smog') ) {
                            env[env.length-1].ticks = 10
                            return
                        }
                        
                        let smog = {'name': 'smog', 'ticks': 10, 'x': pos[0], 'y': pos[1]}
                        
                        !animal.smog ? animal.smog = [smog] : animal.smog.push(smog)
                        this.environment[pos[1]][pos[0]].constructor == Array ? this.environment[pos[1]][pos[0]].push(smog) : this.environment[pos[1]][pos[0]] = [this.environment[pos[1]][pos[0]], smog]
                    }, [x, y], animal_vars['attack_range'])

                    if ( base_in_proximity ) {
                        moveable_area = towards(closest_base)
                        break
                    }

                    move_straight()

                    break
                }
                case 'reaper': {          
                    if ( attack_player && player.same_level('dirt') ) {
                        if ( dist_from_player <= animal_vars['attack_range'] ) {
                            hit_player('imprecated by reaper')
                            
                            if ( random() < animal_vars['teleport_chance'] ) {
                                let teleport_area = game_objects.spread(x, y, '', [], animal_vars['teleport_radius'], false, animal_vars['moveable_terrain'])
                                teleport_area.sort((node1, node2) => {return math.distance(node2.position, [x, y]) - math.distance(node1.position, [x, y])})
                                
                                moveable_area = [teleport_area[round(random() ** .8 * teleport_area.length)]]
                            }
                        }
                        else {
                            random() < .7 && (moveable_area = towards(player))
                        }
                    }
                    if ( attack_base() ) break

                    break
                }
            }

            try{var filtered_area = moveable_area.filter(node=>{return round(node.g)==round(move_radius)})}catch{debugger}
            let node = filtered_area.length ? filtered_area[getRandomInt(filtered_area.length)] : moveable_area[getRandomInt(moveable_area.length)]
            var [newx, newy] = node.position
            var new_terrain = this.environment[newy][newx]

            let twinenet_around = false
            let hole_around = false
            let hole_coord

            animal.previous_position = [x, y]

            Game_state.aoe( (sel, _, pos) => {
                sel.includes('hole') && !sel.includes('plank') && (hole_around = true, hole_coord = pos)
                sel.includes('twinenet') && (twinenet_around = true)
            }, [newx, newy], 1)

            if ( hole_around && Game_state.holeable_animals.includes(animal.name) ) {
                [newx, newy] = hole_coord
                this.terrain_effect(animal, new_terrain)
            }
            else if ( twinenet_around && Game_state.twinenettable_animals.includes(animal.name) ) {
                this.give_buff_to_animal(animal, 'tangled', animal_vars['tangled_duration'])
            }
            else if ( new_terrain.constructor == Array && new_terrain.some(t=>{return t.name == 'smog'}) && animal.name != 'doctor' ) {
                if ( !Game_state.passive_animals.includes(animal.name) ) {
                    animal.ticks = 0
                    game_state.heal_animal(animal, Game_state.items_states['smog']['healmonster'], 'magic')
                } else {
                    game_state.heal_animal(animal, -Game_state.items_states['smog']['healmonster'], 'magic')
                }
            }

            this.displace_environment(animal)
            
            if ( Game_state.pooping_animals.includes(animal.name) ) {
                if ( random() < (animal.fed ? Game_state.poop_chance_fed : Game_state.poop_chance) ) 
                this.environment[y][x].constructor == Array ? this.environment[y][x].push('manuer') : this.environment[y][x] = [this.environment[y][x], 'manuer']
            }
            
            animal['pos'] = [newx, newy]
            this.environment[newy][newx].constructor == Array ? this.environment[newy][newx].push(animal) : this.environment[newy][newx] = [this.environment[newy][newx], animal]
                        
            if ( player.seeable_positions.some(pos=>{return (pos[0] == newx && pos[1] == newy) || (pos[0] == x && pos[1] == y) }) ) animal_move_in_proximity = true
        }
        
        if ( animal_move_in_proximity ) {
            game_objects.draw_in_round()
        }

        for (let index=this.animals.length-1; index>=0; index --) {
            let ind = attack_heal_animals.map(values=>{return values[0]}).indexOf(this.animals[index])

            if ( ind != -1 ) {
                let animal = this.animals[index]
                let attack = attack_heal_animals[ind][1]
                let attacktype = attack_heal_animals[ind][2]

                this.heal_animal(animal, attack, attacktype)
            }
        }

    }

    reaper_light = (x, y) => {
        return this.animals.some(animal => {
            if ( animal.name != 'reaper' ) return false

            var dist = math.distance([x, y], animal.pos)

            if ( dist <= Game_state.animals['reaper']['light_radius'] ) return true
        })
    }

    environment_set_up = () => {

        rivers : {
            var river_points = []
            let rivers = math.round( height / 50 ) + 2
            

            for (let river=0;river<rivers;river++) {
                let xory = random() < .5 ? 'x' : 'y'
                var river_width = Math.round(Math.random() + .5)
                var river_function = ''   

                if (xory == 'x') {
                    for (let i=1; i < 5; i++){
                        river_function += ` + 25*Math.sin(${xory}*${2*Math.PI*(Math.random()+1)*i/width} + ${Math.random()*100*i**2}) / ${Math.sqrt(i)} * ${Math.random()*height/100} `
                    }
                    river_function = ` ${ height - (Math.random()+.5) * river / rivers * height } + (${river_function}) `

                    for (let x=0; x<width; x+=.1) {
                        let y = eval(river_function)
                        let xvalue = Math.round(x), yvalue = Math.round(y)

                        for (let indx=-river_width;indx<river_width;indx++) {
                            for (let indy=-river_width;indy<river_width;indy++) {
                                let xcoord = xvalue+indx
                                let ycoord = yvalue+indy

                                if (xcoord >= 0 && ycoord >= 0) river_points.push( [xvalue+indx, yvalue+indy] )  
                            }
                        }
                        
                    }
                } else {
                    for (let i=1; i < 5; i++){
                        river_function += ` + 25*Math.sin(${xory}*${2*Math.PI*(Math.random()+1)*i/height} + ${Math.random()*100*i**2}) / ${Math.sqrt(i)} * ${Math.random()*height/100} `
                    }
                    river_function = ` ${ width - (Math.random()+.5) * river / rivers * width - 10  } + (${river_function}) `

                    for (let y=0; y<height; y+=.1) {
                        let x = eval(river_function)
                        let xvalue = Math.round(x), yvalue = Math.round(y)

                        for (let indx=-river_width;indx<river_width;indx++) {
                            for (let indy=-river_width;indy<river_width;indy++) {
                                let xcoord = xvalue+indx
                                let ycoord = yvalue+indy

                                if (xcoord >= 0 && ycoord >= 0) river_points.push( [xvalue+indx, yvalue+indy] )  
                            }
                        }    
                    }
                }
            }
        }

        mountains: {
            var mountain_points = []
            var vein_points = []

            for (let x=0;x<width;x++){
                for (let y=0;y<height;y++){
                    let noisevalue = noise(x/20, y/20)
                    let mountain_height = 0;

                    noisevalue > .80 ? mountain_height = 2 : (noisevalue > .78 && random() < .3) ? vein_points.push([x, y]) : noisevalue > .60 && (mountain_height = 1)

                    mountain_points.push( [x, y, mountain_height] )
                }
            }
        }

        darklands: {
            var darklands_points = []
            var mystery_pond = []

            for (let x=0;x<width;x++){
                for (let y=0;y<height;y++){
                    let noisevalue = noise(x/20, y/20)
                    
                    if (noisevalue < .15) {mystery_pond.push( [x, y] )} 
                    else if (noisevalue < .30) {darklands_points.push( [x, y] )} 
                }
            }
        }

        plains_forest: {
            randomSeed(530)
            var plains_forest_points = []

            for (let x=0;x<width;x++){
                for (let y=0;y<height;y++){
                    let noisevalue = noise(x/10, y/10)
                    
                    if (noisevalue < .4) {plains_forest_points.push( [x, y] )} 
                }
            }
        }

        pond: {
            randomSeed(532)
            var pond_points = []
            var coralreef_points = []

            for (let x=0;x<width;x++){
                for (let y=0;y<height;y++){
                    let noisevalue = noise(x/60, y/60)
                    
                    noisevalue > .78 ? coralreef_points.push( [x, y] ) : noisevalue > .7 && pond_points.push( [x, y] )
                }
            }
        }
        
        this.environment.forEach( ( y_array, index_y ) => {         //env materials
            y_array.forEach( ( 一, index_x ) => {
                if (Math.random() <.90) return
                
                this.environment[index_y][index_x] = random(Game_state.environment_items)
                
            })
        })
        pond_points.forEach(pond_point => {
            let [x,y]=pond_point
            let terrain = this.environment[y][x]
            
            if ( terrain.includes('darkland') ) {
                this.environment[y][x].push('water')
            }
            else this.environment[y][x] = ['water']

            random() < .1 ? this.environment[y][x].push('lilypad') : random() < .05 ? this.environment[y][x].push('cattail') : random() < .1 && this.environment[y][x].push('mussel')

            this.environment[y][x] == 'water' && (this.environment[y][x] = 'water')
        })
        coralreef_points.forEach(coralreef_point => {
            let [x,y]=coralreef_point
            this.environment[y][x] = ['water']

            random() < .8 ? this.environment[y][x].push('coral1') : random() < .6 ? this.environment[y][x].push('coral2') : random() < .9 && this.environment[y][x].push('shell') 
        })
        mountain_points.forEach(mountain_point => {                 // mountain
            let [x, y, h] = mountain_point
            
            if (h == 0) return   //height = h
            
            h == 1 ? this.environment[y][x]=['mountain1'] : this.environment[y][x]=['mountain2']
            
            if ( Math.random() > .82 ) this.environment[y][x].push( random( Game_state.mountain_items ) )
        })
        vein_points.forEach(vein_point => {
            let [x, y] = vein_point

            this.environment[y][x] = ['mountain1', 'orevein']
        })
        river_points.forEach(riverpoint => {                 // river
            let [x, y] = riverpoint
            
            if (y > height-1 || x > width-1) return
            
            this.environment[y][x]='water'

            random() < .1 && (this.environment[y][x] = ['water', 'cattail']);
        })
        darklands_points.forEach(darklands_point => {                 // darklands
            let [x,y]=darklands_point

            if ( this.environment[y][x] != 'dirt' ) {
                this.environment[y][x].constructor==Array?this.environment[y][x]=['darkland'].concat(this.environment[y][x]):this.environment[y][x]=['darkland', this.environment[y][x]]
            }else {
                this.environment[y][x] = ['darkland']
                random() < .05 ? this.environment[y][x].push('tulip') : random() < .01 && this.environment[y][x].push('mushroom')
            }

        })
        mystery_pond.forEach(mystery_pond_points => {                 // mystery pond
            let [x,y]=mystery_pond_points

            this.environment[y][x] = ['mysterypond']
        })
        plains_forest_points.forEach(plains_forest_point => {
            let [x,y]=plains_forest_point
            let terrain = this.environment[y][x]

            terrain[0] == 'mountain1' && (this.environment[y][x] = ['mountain1', 'grass']);
            (Game_state.environment_items.includes(terrain) || terrain == 'dirt') && (this.environment[y][x] = ['dirt', 'grass']);
            if ( !this.environment[y][x].includes('grass') ) return

            random() < (this.environment[y][x].includes('mountain1') ? .3 : .15) ? this.environment[y][x].push('tree') : random() > .85 ? this.environment[y][x].push( random(Game_state.forest_items) ) : random() < .005 ? this.environment[y][x].push('edentree') : random() < .02 && this.environment[y][x].push('wood')
            this.environment[y][x][this.environment[y][x].length-1] == 'grass' && ( random() < .05 ? this.environment[y][x].push('dandelion') : random() < .05 && this.environment[y][x].push('chickweed') )
        })
        // var possible_quary_locations = []                             // quaries
        // this.environment.forEach( ( y_array, index_y ) => {
        //     y_array.forEach( ( 一, index_x ) => {           
        //         if ( this.environment[index_y][index_x] == 'dirt' ) possible_quary_locations.push([index_x, index_y])  
        //         else if ( this.environment[index_y][index_x][0] == 'mountain1' && random() < .9 ) possible_quary_locations.push([index_x, index_y]) 
        //         else if ( this.environment[index_y][index_x][0] == 'mountain2' && random() < .1 ) possible_quary_locations.push([index_x, index_y]) 
        //     })
        // })
        // for (let i=0;i<1;i++) {                     //how many quaries
        //     let [x, y] = possible_quary_locations[int(random()*possible_quary_locations.length-1)]
        //     this.environment[y][x] == 'dirt' ? this.environment[y][x] = ['dirt', 'quary'] : this.environment[y][x] = [this.environment[y][x][0], 'quary']
        // }
    }

    increase_difficulty = () => {
        Object.values(Game_state.animals).forEach(animal => {
            animal['rounds_till_spawn'] && (animal['relative_spawn_chance'] += animal['rounds_till_spawn'] / 10)
        })
    }

    new_event = () => {
        this.rounds_till_event_end --

        if ( this.rounds_till_event_end > 0 ) return

        if ( random() < .1 ) {   //random event chance
            let relative_chances = []

            Object.entries(Game_state.event_values).forEach(([name, values]) => {
                for (let i=0;i<=values['relative_chance'];i++) {
                    relative_chances.push(name)
                }
            })
            this.event = random(relative_chances)
        } else { this.event = ''; this.max_animals = this.base_max_animals; return }

        let rounds_last_max = Game_state.event_values[this.event]['rounds_last'][1]
        let rounds_last_min = Game_state.event_values[this.event]['rounds_last'][0]

        this.rounds_till_event_end = random() * (rounds_last_max - rounds_last_min) + rounds_last_min

        if ( this.event == 'bloodmoon' ) {
            this.day = false
            this.rounds_till_daynight = this.rounds_till_event_end
        }

        this.max_animals = this.get_event_mult('max_animal_mult') * this.base_max_animals

        for (let i=0;i<this.rounds_till_event_end-2;i++){
            round_messages.push(`New Event: ${this.event}`)
        }
    }

    get_event_mult = mult_name => {
        return (Game_state.event_values[this.event] && Game_state.event_values[this.event][mult_name]) ?? 1
    }

    next_turn = () => {      
        this.rounds ++

        this.turn.hammock_sleep()
        
        if ( this.turn == player_1 ) {
            this.turn = player_2
            player_1.increase_AC() 
            player_1.hunger = max(player_1.hunger - 1, 0)
        }
        else {
            this.turn = player_1
            player_2.increase_AC()
            player_2.hunger = max(player_2.hunger - 1, 0)
        }

        this.rounds_till_daynight <= 0 ? ( this.day = !this.day, this.rounds_till_daynight = round(random() * 5 + 5) + this.rounds/10 ) :
        ( this.rounds_till_daynight -- )

        message = ''
        round_messages.shift()
        
        this.new_event()

        this.despawn_animals()
        this.generate_animals()
        this.increase_difficulty()
        background(255, 255, 0)
        window.setTimeout(main, 1000)
    }
}