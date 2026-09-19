export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  tags?: string[];
};

export const menuItems: MenuItem[] = [
  // To Share
  { id: 'botana', name: 'Botana Oaxaqueña', description: 'Cecina, carne enchilada, sausage, chapulines, mole taquitos, black bean dip, pickled onion, jalapeño, guacamole & chips.', price: 35, category: 'To Share' },
  { id: 'chips', name: 'Chips & Salsa', description: 'House chips with our roasted chile salsa.', price: 5, category: 'To Share', tags: ['veg'] },
  { id: 'chapulines', name: 'Chapulines', description: 'Toasted Oaxacan grasshoppers with lime and chile.', price: 11, category: 'To Share' },

  // Tlayudas
  { id: 'tlayuda-tradicional', name: 'Tlayuda Tradicional', description: 'Asiento, refried beans, Oaxacan cheese, cabbage, tomato, avocado, and one choice of meat.', price: 23.5, category: 'Tlayudas' },
  { id: 'tlayuda-mixta', name: 'Tlayuda Mixta', description: 'Asiento, refried beans, Oaxacan cheese, cabbage, tomato, avocado, cecina & chorizo.', price: 25, category: 'Tlayudas' },
  { id: 'tlayuda-chingona', name: 'Tlayuda La Chingona', description: 'Asiento, refried beans, Oaxacan cheese, cabbage, tomato, avocado, cecina, carne enchilada, chorizo & chapulines.', price: 30, category: 'Tlayudas' },
  { id: 'tlayuda-mole', name: 'Tlayuda de Mole', description: 'Asiento, mole rojo, Oaxacan cheese, cabbage, tomato, avocado, shredded chicken.', price: 25, category: 'Tlayudas' },
  { id: 'tlayuda-veg', name: 'Tlayuda Vegetariana', description: 'Refried beans, Oaxacan cheese, cabbage, tomato, avocado, nopales.', price: 20, category: 'Tlayudas', tags: ['veg'] },

  // Tacos
  { id: 'tacos-bcp', name: 'Tacos (Beef · Chicken · Pork)', description: 'Three corn tortillas with onion & cilantro.', price: 11.5, category: 'Tacos' },
  { id: 'tacos-5', name: 'Tacos (Five)', description: 'Five corn tortillas with onion & cilantro.', price: 16, category: 'Tacos' },
  { id: 'tacos-specialty', name: 'Specialty Tacos', description: 'Mole with shredded chicken, shrimp, chapulines, or cecina with avocado & cilantro.', price: 12, category: 'Tacos' },
  { id: 'tacos-cochinita', name: 'Cochinita Pibil Tacos', description: 'Slow-cooked citrus pork, pickled onion and habanero.', price: 12, category: 'Tacos' },

  // Antojitos
  { id: 'picaditas-1', name: 'Picaditas (One)', description: 'Green or red salsa, sour cream, queso fresco, onion and cilantro.', price: 8, category: 'Antojitos' },
  { id: 'picaditas-2', name: 'Picaditas (Two)', description: 'Green or red salsa, sour cream, queso fresco, onion and cilantro.', price: 12, category: 'Antojitos' },
  { id: 'tetelas', name: 'Tetelas', description: 'Triangular tortilla filled with black bean paste, topped with sour cream & queso fresco.', price: 10, category: 'Antojitos' },
  { id: 'torta', name: 'Torta "El Alebrije"', description: 'Beef milanesa, chorizo, egg, ham, sausage, lettuce, tomato, avocado, panela cheese, pickled jalapeños and refried beans.', price: 15, category: 'Antojitos' },
  { id: 'taquitos-mole', name: 'Taquitos de Mole', description: 'Five chicken taquitos, mole rojo, crema, onion and queso fresco.', price: 13, category: 'Antojitos' },
  { id: 'honeys-bowl', name: "Honey's Bowl", description: 'Rice, lettuce, cabbage, house sauce, queso fresco, avocado, pico de gallo.', price: 10, category: 'Antojitos', tags: ['veg'] },

  // Tex-Mex
  { id: 'hamburguesa', name: 'Hamburguesa', description: 'Panela cheese, lettuce, tomato, onion, pickles, house sauce, jalapeño toast & seasoned fries.', price: 12.5, category: 'Tex-Mex' },
  { id: 'nachos', name: 'Nachos', description: 'Refried beans, cheese, sour cream, pickled jalapeños, pico de gallo.', price: 11, category: 'Tex-Mex' },
  { id: 'quesadilla', name: 'Quesadilla', description: 'Flour tortilla, cheese, lettuce, tomato & sour cream.', price: 8, category: 'Tex-Mex' },
  { id: 'papas-locas', name: 'Papas Locas', description: 'Loaded seasoned fries with cheese, house sauce, pico de gallo.', price: 9, category: 'Tex-Mex' },

  // Sweet & Easy
  { id: 'churros', name: 'Churros', description: 'Six mini churros filled with caramel, drizzled with condensed milk.', price: 6.5, category: 'Sweet & Easy' },
  { id: 'aguas', name: 'Aguas Frescas', description: 'Fresh rotating aguas made in house.', price: 2.25, category: 'Sweet & Easy' },
  { id: 'mexcoke', name: 'Mexican Coke', description: 'Classic glass bottle, ice cold.', price: 4.25, category: 'Sweet & Easy' },
  { id: 'topo', name: 'Topo Chico', description: 'Sparkling mineral water.', price: 3.25, category: 'Sweet & Easy' },
];

export const categories = ['All', 'To Share', 'Tlayudas', 'Tacos', 'Antojitos', 'Tex-Mex', 'Sweet & Easy'];
