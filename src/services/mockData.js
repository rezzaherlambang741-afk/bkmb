// Mock Data for initial development since we can't connect to a real DB yet
export const MOCK_STAFF = [
  { id: '1', name: 'CS ANDI', gender: 'cowo', photoURL: 'https://placehold.co/400x600/1e293b/FFF?text=CS+Andi', waNumber: '6281234567890', status: 'online' },
  { id: '2', name: 'CS BUDI', gender: 'cowo', photoURL: 'https://placehold.co/400x600/1e293b/FFF?text=CS+Budi', waNumber: '6281234567891', status: 'offline' },
  { id: '3', name: 'CS SITI', gender: 'cewe', photoURL: 'https://placehold.co/400x600/1e293b/FFF?text=CS+Siti', waNumber: '6281234567892', status: 'online' },
  { id: '4', name: 'CS DEWI', gender: 'cewe', photoURL: 'https://placehold.co/400x600/1e293b/FFF?text=CS+Dewi', waNumber: '6281234567893', status: 'online' },
];

export const MOCK_RESULTS = [
  { id: '1', date: '2023-10-25', pasaran: 'SINGAPORE', prize1: '1234', jam_result: '17:45' },
  { id: '2', date: '2023-10-25', pasaran: 'HONGKONG', prize1: '5678', jam_result: '23:00' },
  { id: '3', date: '2023-10-26', pasaran: 'SYDNEY', prize1: '9012', jam_result: '13:50' },
];

export const MOCK_JACKPOT = [
  { id: '1', imageURL: 'https://placehold.co/1920x1080/1e293b/FFF?text=Jackpot+Winner+1', date: '2023-10-24' },
  { id: '2', imageURL: 'https://placehold.co/1920x1080/1e293b/FFF?text=Jackpot+Winner+2', date: '2023-10-25' },
];

export const MOCK_SETTINGS = {
  downloadLink: 'https://google.com',
  memberLink: 'https://google.com',
  promoLink: 'https://google.com',
  bannerImages: [
    'https://placehold.co/1920x600/1e293b/FFF?text=Banner+Promo+1',
    'https://placehold.co/1920x600/0f172a/FFF?text=Banner+Promo+2'
  ]
};
