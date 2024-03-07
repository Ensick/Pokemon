
export class Pokemon {
    
    name: string;
    id: number;
    types: Array<Category>;
    sprites: HomeSprites;
    stats: Array<Stat>;

    constructor(values : { name: string; id: number; types: Array<any>; sprites: any; stats: Array<any>;}) {
        this.id = values.id;
        this.name = values.name;
        this.types = values.types;
        this.sprites = new HomeSprites(values.sprites.other["official-artwork"]);
        this.stats = values.stats;
    }
}

class Category {
    slot: number;
    type: Type;

    constructor(slot: number, type: Type) {
        this.slot = slot;
        this.type = type;
    }
}

class Type {
    name: string;
    url: string;

    constructor(name: string, url: string) {
        this.name = name;
        this.url = url;
    }
}

class Stat {
    base_stat: number;
    effort: number;
    stat: {
        name: string;
        url: string;
    };

    constructor(base_stat: number, effort: number, stat: { name: string; url: string }) {
        this.base_stat = base_stat;
        this.effort = effort;
        this.stat = stat;
    }
}

class HomeSprites {
    front_default: string = "";
    front_shiny: string = "";

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }

    public spriteFromObject(objedt:any) {
        this.front_default = objedt.front_default;
        this.front_shiny = objedt.front_shiny;
    }
}
