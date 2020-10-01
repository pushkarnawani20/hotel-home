const eventList = [
  'BIRTHDAY PARTY',
  'SOCIAL EVENT',
  'CORPORATE PARTY',
  'WEDDING CEREMONY',
  'COCKTAIL PARTY',
  'ANNIVERSARY CELEBRATION',
  'SPECIAL OCCASIONS',
  'BACHELOR PARTY',
  'HOUSE PARTY',
  'CATERING SERVICES',
  'LIVE BAR',
  'LIVE CHEF',
];

export const eventTimes = [
  'Morning(8AM - 12PM)',
  'AfterNoon(1PM - 5PM)',
  'Evening(6PM - 10PM)',
];

export const tableHead = ['Name', 'Service', 'Date', 'Amount', 'Hotel'];

export const options = eventList.map((val: string, index: number) => {
  return {
    name: val,
    id: index,
  };
});
