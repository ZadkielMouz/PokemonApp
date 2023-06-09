// Generated by https://quicktype.io

export interface Pokemon2 {
    id:                       number;
    name:                     string;
    sprites:                  Sprites;
}


export interface Sprites {
    back_default:       string;
    back_female:        null;
    back_shiny:         string;
    back_shiny_female:  null;
    front_default:      string;
    front_female:       null;
    front_shiny:        string;
    front_shiny_female: null;
    other?:             Other;
    animated?:          Sprites;
}


export interface Other {
    dream_world:        DreamWorld;
}

export interface DreamWorld {
    front_default: string;
    front_female:  null;
}
