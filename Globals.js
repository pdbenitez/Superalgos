/* Canvas is the root object that will contain all spaces and everything inside. */
let canvas
let PROJECTS
let SCHEMAS_BY_PROJECT = new Map()

/* User Interface Colors */
const UI_COLOR = {
    DARK: "48, 48, 54",
    LIGHT: "234, 226, 222",
    GREY: "150, 150, 150",
    LIGHT_GREY: "247, 247, 247",
    WHITE: "255, 255, 255",
    BLACK: "0, 0, 0",
    GOLDEN_ORANGE: "240, 162, 2",
    RUSTED_RED: "204, 88, 53",
    GREEN: "188, 214, 67",
    RED: "223, 70, 60",
    PATINATED_TURQUOISE: "27,153,139",
    TITANIUM_YELLOW: "244,228,9",
    MANGANESE_PURPLE: "91,80,122",
    TURQUOISE: "74,207,217",
    DARK_TURQUOISE: "2,149,170"
};

/* User Interface Fonts */
const UI_FONT = {
    PRIMARY: "Saira Condensed",
    SECONDARY: "Source Code Pro"
};

const DOCUMENTATION_URL_PREFIX = 'https://docs.superalgos.org/'
const DOCUMENTATION_URL_DEFAULT = 'https://docs.superalgos.org/suite-about-this-documentation.html'

const MAC_AMOUNT_FACTOR = 5
const IS_MAC = navigator.platform.toUpperCase().indexOf('MAC') >= 0

const DOUBLE_CLICK_ZOOM_OUT_LEVEL = 0
const DOUBLE_CLICK_ZOOM_IN_LEVEL = 6
const DOUBLE_CLICK_ZOOM_IN_IN_LEVEL = 7

const DEBUG = {}
const ZOOM_OUT_THRESHOLD_FOR_NOT_HIDDING_PANELS = 12
const ZOOM_OUT_THRESHOLD_FOR_HIDDING_PANELS = 7
const ZOOM_OUT_THRESHOLD_FOR_HIDDING_CHARTS_LABELS = 7
const ZOOM_OUT_THRESHOLD_FOR_CHANGING_TIME_FRAME = 3  // This help regulate when to change the Time Frame base on the level of zoom out.
const ZOOM_OUT_THRESHOLD_FOR_PACKING_OBJECTS_AT_THE_BOTTOM_OR_TOP_OF_VIEWPORT = 2
const ZOOM_OUT_THRESHOLD_FOR_PLOTTING_IN_LOW_RESOLUTION = 3
const ZOOM_OUT_THRESHOLD_FOR_DISPLAYING_TIME_MACHINES_ICONIZED = 5
const ZOOM_OUT_THRESHOLD_FOR_DISPLAYING_SCALES = 3

let FONT_ASPECT_RATIO = 0.32;
let ANIMATION_FRAME_PER_SECONDS

let DISABLE_BROWSER_RESIZE_EVENT = false

const GET_CONTAINER_PURPOSE = {
    MOUSE_OVER: 1,
    MOUSE_WHEEL: 2,
    MOUSE_CLICK: 3,
    DRAGGING: 4
}

const ANGLE_TO_PARENT = {
    NOT_FIXED: 0,
    RANGE_360: 1,
    RANGE_180: 2,
    RANGE_90: 3,
    RANGE_45: 4
}

const DISTANCE_TO_PARENT = {
    NOT_FIXED: 0,
    PARENT_025X: 1,
    PARENT_050X: 2,
    PARENT_100X: 3,
    PARENT_150X: 4,
    PARENT_200X: 5
}

const ARRANGEMENT_STYLE = {
    CONCAVE: 0,
    CONVEX: 1,
    VERTICAL_RIGHT: 2,
    VERTICAL_LEFT: 3,
    HORIZONTAL_BOTTOM: 4,
    HORIZONTAL_TOP: 5
}

/* User Interface Panels */

const UI_PANEL = {
    WIDTH: {
        SMALL: 100,
        NORMAL: 150,
        MEDIUM: 200,
        LARGE: 250,
        X_LARGE: 350
    },
    HEIGHT: {
        SMALL: 65,
        MEDIUM: 90,
        NORMAL: 300,
        LARGE: 450
    }
};


let marketFilesPeriods =
    '[' +
    '[' + 24 * 60 * 60 * 1000 + ',' + '"24-hs"' + ']' + ',' +
    '[' + 12 * 60 * 60 * 1000 + ',' + '"12-hs"' + ']' + ',' +
    '[' + 8 * 60 * 60 * 1000 + ',' + '"08-hs"' + ']' + ',' +
    '[' + 6 * 60 * 60 * 1000 + ',' + '"06-hs"' + ']' + ',' +
    '[' + 4 * 60 * 60 * 1000 + ',' + '"04-hs"' + ']' + ',' +
    '[' + 3 * 60 * 60 * 1000 + ',' + '"03-hs"' + ']' + ',' +
    '[' + 2 * 60 * 60 * 1000 + ',' + '"02-hs"' + ']' + ',' +
    '[' + 1 * 60 * 60 * 1000 + ',' + '"01-hs"' + ']' + ']';

marketFilesPeriods = JSON.parse(marketFilesPeriods);

let dailyFilePeriods =
    '[' +
    '[' + 45 * 60 * 1000 + ',' + '"45-min"' + ']' + ',' +
    '[' + 40 * 60 * 1000 + ',' + '"40-min"' + ']' + ',' +
    '[' + 30 * 60 * 1000 + ',' + '"30-min"' + ']' + ',' +
    '[' + 20 * 60 * 1000 + ',' + '"20-min"' + ']' + ',' +
    '[' + 15 * 60 * 1000 + ',' + '"15-min"' + ']' + ',' +
    '[' + 10 * 60 * 1000 + ',' + '"10-min"' + ']' + ',' +
    '[' + 05 * 60 * 1000 + ',' + '"05-min"' + ']' + ',' +
    '[' + 04 * 60 * 1000 + ',' + '"04-min"' + ']' + ',' +
    '[' + 03 * 60 * 1000 + ',' + '"03-min"' + ']' + ',' +
    '[' + 02 * 60 * 1000 + ',' + '"02-min"' + ']' + ',' +
    '[' + 01 * 60 * 1000 + ',' + '"01-min"' + ']' + ']';

dailyFilePeriods = JSON.parse(dailyFilePeriods);

let SHOW_ANIMATION_PERFORMACE = false;
let MENU_ITEM_ON_FOCUS
let EDITOR_ON_FOCUS

let testUser = window.localStorage.getItem("test_user")
let LOGGED_IN_USER_LOCAL_STORAGE_KEY
let LOGGED_IN_ACCESS_TOKEN_LOCAL_STORAGE_KEY

if (testUser !== null) {
    LOGGED_IN_USER_LOCAL_STORAGE_KEY = "test_user"
    LOGGED_IN_ACCESS_TOKEN_LOCAL_STORAGE_KEY = "test_access_token"
} else {
    LOGGED_IN_USER_LOCAL_STORAGE_KEY = "user"
    LOGGED_IN_ACCESS_TOKEN_LOCAL_STORAGE_KEY = "access_token"
}

const MAX_DEFAULT_RATE_SCALE_VALUE = 35000; // This is needed to know the scale of the market time line.

const WIDHTER_VOLUME_BAR_BASE_FACTOR = 2.5;
const LESS_WIDHTER_VOLUME_BAR_TOP_FACTOR = 1 / 4;

const ONE_DAY_IN_MILISECONDS = 24 * 60 * 60 * 1000;
const _12_HOURS_IN_MILISECONDS = 12 * 60 * 60 * 1000;
const _8_HOURS_IN_MILISECONDS = 8 * 60 * 60 * 1000;
const _6_HOURS_IN_MILISECONDS = 6 * 60 * 60 * 1000;
const _4_HOURS_IN_MILISECONDS = 4 * 60 * 60 * 1000;
const _3_HOURS_IN_MILISECONDS = 3 * 60 * 60 * 1000;
const _2_HOURS_IN_MILISECONDS = 2 * 60 * 60 * 1000;
const _1_HOUR_IN_MILISECONDS = 1 * 60 * 60 * 1000;

const _45_MINUTES_IN_MILISECONDS = 45 * 60 * 1000;
const _40_MINUTES_IN_MILISECONDS = 40 * 60 * 1000;
const _30_MINUTES_IN_MILISECONDS = 30 * 60 * 1000;
const _20_MINUTES_IN_MILISECONDS = 20 * 60 * 1000;
const _15_MINUTES_IN_MILISECONDS = 15 * 60 * 1000;
const _10_MINUTES_IN_MILISECONDS = 10 * 60 * 1000;
const _5_MINUTES_IN_MILISECONDS = 5 * 60 * 1000;
const _4_MINUTES_IN_MILISECONDS = 4 * 60 * 1000;
const _3_MINUTES_IN_MILISECONDS = 3 * 60 * 1000;
const _2_MINUTES_IN_MILISECONDS = 2 * 60 * 1000;
const _1_MINUTE_IN_MILISECONDS = 1 * 60 * 1000;



let NEW_SESSION_INITIAL_DATE = new Date();  // This value will be overwritten at the canvas.chartingSpace.viewport.initialize if the user had a prevous session with this same browser.
let INITIAL_ZOOM_LEVEL = -28.25       // This is the zoom level at the view port in which the APP starts.
let INITIAL_TIME_PERIOD = ONE_DAY_IN_MILISECONDS  // This value will be overwritten at the canvas.chartingSpace.viewport.initialize if the user had a prevous session with this same browser.
let VERY_LARGE_NUMBER = 100000000000000

const TOP_MARGIN = 0
let CURRENT_TOP_MARGIN = TOP_MARGIN
let AT_FULL_SCREEN_MODE = false

let maxDate = new Date();
maxDate.setMilliseconds(0);
maxDate.setDate(maxDate.getDate() + 365 * 1);  // We might have charts that projects data into the future.

const MIN_PLOTABLE_DATE = new Date(2015, 0, 1, 0, 0, 0);
const MAX_PLOTABLE_DATE = maxDate;

const TOP_SPACE_HEIGHT = 40
const COCKPIT_SPACE_HEIGHT = 40;
const SIDE_PANEL_WIDTH = 350
let COCKPIT_SPACE_POSITION = browserCanvas.height - COCKPIT_SPACE_HEIGHT

const LAYER_STATUS = {
    ON: 'on',
    LOADING: 'loading',
    OFF: 'off'
};

let spawnPosition // this is used in several places.

/* Here we list the valid Time Periods: */

const PERIOD_24_HS = "24-hs";
const PERIOD_12_HS = "12-hs";
const PERIOD_06_HS = "06-hs";
const PERIOD_03_HS = "03-hs";
const PERIOD_01_HS = "01-hs";
const PERIOD_30_MIN = "30-min";
const PERIOD_10_MIN = "10-min";
const PERIOD_05_MIN = "05-min";
const PERIOD_01_MIN = "01-min";

/*
We define here the size of the chartingSpace. It has to bee enough big in order to accomodate all the charts we expect to display in this space.
*/

const TIME_MACHINE_WIDTH = 8;
const TIME_MACHINE_HEIGHT = 8;

let mediaRecorder // to downloadText canvas animation as a mediaRecorder
let marketPanoramaCanvas
let ARE_WE_RECORDING_A_VIDEO = false
let ARE_WE_RECORDING_A_MARKET_PANORAMA = false
let PANORAMA_WAS_PANNED = false
let CURRENT_PANORAMA_POSITION = 0

let CAN_SPACES_DRAW = false // This global variable regulates when spaces can or can not draw their contents.

function toRadians(angle) {
    return angle * (Math.PI / 180);
}
