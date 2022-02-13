export const SELECT_OPTIONS = [
    {
        id: 1,
        name: 'Alimentos',
        multiselect: false,
        categories: [
            {
                name: 'Alimentos Secos',
                subcategories : [
                    {
                        name: 'Super Premium',
                        subcategories_description: [
                            {
                                name: 'Maintenance'
                            },
                            {
                                name: 'Specialties'
                            },
                            {
                                name: 'Razas'
                            },
                            {
                                name: 'Veterinary Diets'
                            }
                        ]
                    },
                    {
                        name: 'High Premium',
                        subcategories_description: []
                    }
                ]
            },
            {
                name: 'Alimentos Húmedos',
                subcategories: [
                    {
                        name: 'Super Premium'
                    }
                ]
            }
        ]
    },
    {
        id:2,
        name: 'Higiene y aseo',
        multiselect: false,
        categories: [
            {
                name: 'Arenas sanitarias',
            },
            {
                name: 'Higiene dental'
            }
        ]
    },{
        id:3,
        name: 'Accesorios',
        multiselect: false,
        categories: [
            {
                name: 'Toallas',
            },
            {
                name: 'Bowls'
            }
        ]
    },
    {
        id:4,
        name: 'Fármacos',
        multiselect: true,
        categories: [
            {
                name: 'Antiparasitarios',
            },
            {
                name: 'Antipulgas'
            }
        ]
    },
    {
        id:5,
        name: 'Nutricionales',
        multiselect: true,
        categories: [
            {
                name: 'Minerales',
            },
            {
                name: 'Vitaminas'
            }
        ]
    }
]

export const SELECT_OPTIONS_SERVICES = [
    {
        id: 1,
        name: 'Categorias Prueba 1'
    },
    {
        id: 2,
        name: 'Categorias Prueba 2'
    },
    {
        id: 3,
        name: 'Categorias Prueba 3'
    },
    {
        id: 4,
        name: 'Categorias Prueba 4'
    },
]

export const SELECT_OPTIONS_BUSINESS = [
    {
        id: 1,
        name: 'Accesorios'
    },
    {
        id: 2,
        name: 'Equipos'
    }
]