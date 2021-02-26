const Menu = require('../../models/menu');

exports.queryResolver = {
  getTodayMenu: async (_, args) => {
    try {
      const currentDay = getCurrentDay();
      const menu = await Menu.find({
        day: currentDay,
        cuisine: args.cuisine,
      });
      return menu;
    } catch (err) {
      throw err;
    }
  },
  getTomorrowMenu: async (_, args) => {
    try {
      const currentDay = getTommrowDay();
      const menu = await Menu.find({
        day: currentDay,
        cuisine: args.cuisine,
      });
      return menu;
    } catch (err) {
      throw err;
    }
  },
};

let getCurrentDay = () => {
  const date = new Date();
  let index = date.getDay();
  let weekday = new Array(7);
  weekday[0] = 'SUNDAY';
  weekday[1] = 'M0NDAY';
  weekday[2] = 'TUESDAY';
  weekday[3] = 'WEDNESDAY';
  weekday[4] = 'THRUSDAY';
  weekday[5] = 'FRIDAY';
  weekday[6] = 'SATURDAY';
  return weekday[index];
};

let getTommrowDay = () => {
  const date = new Date();
  let index = date.getDay();
  if (index == 6) index = 0;
  else index = index + 1;
  let weekday = new Array(7);
  weekday[0] = 'SUNDAY';
  weekday[1] = 'M0NDAY';
  weekday[2] = 'TUESDAY';
  weekday[3] = 'WEDNESDAY';
  weekday[4] = 'THRUSDAY';
  weekday[5] = 'FRIDAY';
  weekday[6] = 'SATURDAY';
  return weekday[index];
};
