export const CHESS_SYMBOLS = {
  wp: '♙',
  wk: '♔',
  wq: '♕',
  wr: '♖',
  wb: '♗',
  wn: '♘',

  bp: '♟',
  bk: '♚',
  bq: '♛',
  br: '♜',
  bb: '♝',
  bn: '♞',
};

export const BOARD_THEME: { [key: string]: { name: string; w: string; b: string } } = {
  gray: { name: 'Gray', b: 'gray', w: 'aliceblue' },
  green: { name: 'Green', b: '#769656', w: '#EEEED2' },
  blue: { name: 'Blue', b: '#4B7399', w: '#EAE9D2' },
  brown: { name: 'Brown', b: '#B58863', w: '#F0D9B5' },
  purple: { name: 'Purple', b: '#8877B7', w: '#EFEFEF' },
  icySea: { name: 'Icy Sea', b: '#84A4B9', w: '#C5D6DD' },
};

export const PIECES_SCHEMA: { [key: string]: string } = {
  bases: 'Bases',
  cases: 'Cases',
  standard: 'Standard',
};
