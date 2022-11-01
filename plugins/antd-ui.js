import Vue from "vue";
import {
  Drawer,
  Slider,
  DatePicker,
  TimePicker,
  Popconfirm,
  Popover,
  Button,
  Tag,
  Divider,
  Table,
  Pagination,
  Row,
  Col,
  Form,
  FormModel,
  Icon,
  Input,
  InputNumber,
  Checkbox,
  Radio,
  Switch,
  Avatar,
  Upload,
  Menu,
  Layout,
  Modal,
  Select,
  Dropdown,
  Tabs,
  Rate,
  Timeline,
  Tooltip,
  Collapse,
  Spin,
  Alert,
  Card,
  notification,
  message,
  TreeSelect,
  Carousel,
} from "ant-design-vue/es";

Vue.use(Drawer);
Vue.use(Slider);
Vue.use(DatePicker);
Vue.use(TimePicker);
Vue.use(Popconfirm);
Vue.use(Popover);
Vue.use(Button);
Vue.use(Tag);
Vue.use(Divider);
Vue.use(Table);
Vue.use(Pagination);
Vue.use(Row);
Vue.use(Col);
Vue.use(Form);
Vue.use(FormModel);
Vue.use(Icon);
Vue.use(Checkbox);
Vue.use(Radio);
Vue.use(Switch);
Vue.use(Menu);
Vue.use(Layout);
Vue.use(Modal);
Vue.use(Select);
Vue.use(Dropdown);
Vue.use(Input);
Vue.use(InputNumber);
Vue.use(Avatar);
Vue.use(Upload);
Vue.use(Tabs);
Vue.use(Rate);
Vue.use(Timeline);
Vue.use(Tooltip);
Vue.use(Collapse);
Vue.use(Spin);
Vue.use(Alert);
Vue.use(Card);
Vue.use(TreeSelect);
Vue.use(Carousel);

Vue.prototype.$confirm = Modal.confirm
Vue.prototype.$message = message
Vue.prototype.$notification = notification
Vue.prototype.$info = Modal.info
Vue.prototype.$success = Modal.success
Vue.prototype.$error = Modal.error
Vue.prototype.$warning = Modal.warning
