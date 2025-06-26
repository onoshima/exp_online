/* initialize jsPsych */
const jsPsych = initJsPsych({
  on_finish: function() {
    jsPsych.data.displayData();
  }
});

/* create timeline */
const timeline = [];


/* set participant id and block order */
const participant_id = jsPsych.randomization.randomID(10);
const filename = `${participant_id}.csv`;
const exp_id = 'hhdvS9h2hr2h';
const study_code = '52';
const code = jsPsych.randomization.randomInt(1000, 9999);

jsPsych.data.addProperties({
  participant_id: participant_id,
  code: code,
  study_id: study_code,
});

/* preload images */
const preload = {
  type: jsPsychPreload,
  images: ['img/left_arrow.png', 'img/right_arrow.png', 'img/cross.png']
}
timeline.push(preload);

const enter_fullscreen = {
  type: jsPsychFullscreen,
  message:`
  <p>実験はフルスクリーンモードで行います。</p>
  <p>ボタンを押すとフルスクリーンモードに切り替わります。</p>
  `,
  button_label: '進む',
  fullscreen_mode: true
}
timeline.push(enter_fullscreen);

/* browser check */
const browsers_list = ['chrome', 'edge-chromium'];
const browser_check = {
  type: jsPsychBrowserCheck,
  inclusion_function: (data) => {
    is_targetBrowser = browsers_list.includes(data.browser);
    is_nonMobile = data.mobile === false;
    return is_targetBrowser && is_nonMobile
  },
  exclusion_message: (data) => {
    if(data.mobile){
      return `
      <p>スマートフォンやタブレットからは参加できません。</p>
      <p>デスクトップPCもしくはノートPCからご参加ください。</p>
      <p>（Escキーでフルスクリーンモードを終了できます）</p>'
      `;
    } else if(!browsers_list.includes(data.browser)){
      return `
      <p>この実験はGoogle Chrome もしくは Microsoft Edge（Chromium版）でのみ参加できます。</p>
      <p>（Escキーでフルスクリーンモードを終了できます）</p>
      `
    }
  },
  on_finish: function(data) {
    data.screen_width = window.screen.width;
    data.screen_height = window.screen.height;
    data.devicePixelRatio = window.devicePixelRatio;
  }
};
timeline.push(browser_check);


