import { observable, action } from 'mobx';

const header = observable({
  active: false,
  transition: true,

  toggle: action(() => {
    header.active = !header.active;
    header.transition = true;
  }),

  navigate: action(() => {
    header.active = false;
    header.transition = false;
  }),
});

export default header;
