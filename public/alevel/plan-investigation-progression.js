/* Authored planning decisions that bridge guided completion and transfer. */
(function () {
  'use strict';
  const data = window.ALevelPlanInvestigationData;
  const byId = id => data.investigations.find(item => item.id === id);
  const field = (id, label, entries) => ({ id, label, type: 'select', options: entries.map(([value, text]) => ({ value, label: text })) });
  const number = (id, label, min, max) => ({ id, label, type: 'number', min, max, step: 1 });
  const potato = byId('potato');
  const beetroot = byId('beetroot');
  const growth = byId('growth');
  const cress = byId('cress');

  potato.guide = [
    'Modelled: an allocation at one concentration and a worked mass-change calculation.',
    'You decide the remaining comparison, measurements, conditions and processing.',
    'The checker compares the represented decisions; it does not assess your written explanation.',
    'Optional planning help can reveal a worked approach.'
  ];
  beetroot.guide = [
    'Supplied: apparatus, colorimeter explanation and a partly planned investigation to improve.',
    'You diagnose its problem and construct a workable comparison, treatment and measurement.',
    'The checker compares the represented decisions; it does not assess your written procedure or explanation.',
    'Optional planning help can reveal a worked approach.'
  ];
  growth.guide = [
    'Supplied: biological information, treatments, equipment and the growing schedule; no design is selected.',
    'You allocate the seedlings, coordinate measurements and processing, and consider what a comparison can show.',
    'The checker assesses represented decisions and the authored reasoning choice, not your written procedure.',
    'Optional planning help can reveal one possible design.'
  ];
  cress.guide = [
    'The brief supplies the biology and apparatus. Your first response is saved separately.',
    'You decide the method, then review it using focused follow-up checks.',
    'The checker assesses only represented follow-up decisions, not either written plan.',
    'Optional planning help can reveal a possible design.'
  ];

  beetroot.areas[0].instruction = 'A partial plan uses separately treated, comparable discs at 20, 40 and 60 °C. It proposes 10 cm³ water per tube at 20 and 40 °C, but 20 cm³ at 60 °C. Diagnose the issue, choose how to repair this proposal, then enter the number of discs at each temperature. Your volume decision is in Samples and conditions.';
  const diagnosis = field('diagnosis', 'What makes this comparison difficult to interpret?', [
    ['random', 'Differences between discs are the main issue; averaging more readings would by itself remove the bias.'],
    ['volume', 'Water volume changes with temperature and may also affect the absorbance reading.'],
    ['blank', 'The different water-bath temperatures require separate colorimeter settings; re-zeroing for each group would address the issue.']
  ]);
  const repair = field('repair', 'How will you repair the proposed comparison?', [
    ['two', 'Keep 20 and 40 °C at 10 cm³ per tube, and omit 60 °C.'],
    ['divide', 'Keep the proposed volumes and multiply every absorbance by its volume.'],
    ['three', 'Keep all three temperatures and use the same chosen water volume in every tube.'],
    ['other', 'Use another design and describe it for review.']
  ]);
  beetroot.areas[0].fields.unshift(diagnosis, repair);
  const beetMeasurement = beetroot.areas[1].fields;
  const timeIndex = beetMeasurement.findIndex(f => f.id === 'time');
  if (timeIndex >= 0) beetMeasurement.splice(timeIndex, 1, number('duration', 'Exposure time for every tube / minutes', 1, 60));
  beetroot.areas[2].fields.find(f => f.id === 'volume').label = 'Common water volume per tube / cm³';
  beetroot.help = [
    'Look for a condition that changes with temperature in the partial plan.',
    'The 60 °C tubes use a different water volume. A comparison needs temperature separated from volume.',
    'For example, keep all three temperatures with four separately treated discs at each, use 10 cm³ in every tube, expose each for 10 minutes and compare mean absorbance. Alternatively, compare just 20 and 40 °C using the supplied 10 cm³ volumes.'
  ];

  growth.areas[0].instruction = 'Construct your own comparison. The numbers count seedlings; you may use two or three supplied concentrations. Decide how treatment is applied and how many independent applications your plan contains.';
  growth.areas[0].fields.push(number('independent_count', 'How many independent treatment applications will your plan have in total?', 0, 18));
  growth.areas[1].instruction = 'Connect when and what you measure to the processing you select. Then consider the separate reasoning scenario.';
  const growthMeasurement = growth.areas[1].fields;
  growthMeasurement.splice(1, 0, number('endday', 'Day on which the final measurement is taken', 1, 14));
  growthMeasurement.push(field('inference', 'A different student randomly assigns seedlings but records no initial lengths. The two groups have different mean final lengths after seven days. What can that comparison alone show?', [
    ['individual', 'The difference in mean final length is the difference in mean increase for these groups, because the seedlings were randomly allocated.'],
    ['finalonly', 'It shows a difference in final lengths. Random allocation supports a treatment comparison, but the individual increases cannot be calculated.'],
    ['nothing', 'The final-length comparison is uninformative unless every seedling started at exactly the same length.']
  ]));
  const growthReason = growth.areas[2].fields.find(f => f.id === 'reason');
  if (growthReason) {
    growthReason.label = 'Describe how you will label, treat and measure seedlings, including how your allocation helps with initial variation.';
    growthReason.type = 'textarea';
  }
  const growingConditions = growth.areas[2].fields.find(f => f.id === 'conditions');
  if (growingConditions) {
    const groupedPositions = growingConditions.options.find(option => option.value === 'varies');
    if (groupedPositions) groupedPositions.label = 'Use the same watering, but group treatments at different distances from the lamp.';
  }

  // Do not make the first substantive option a reliable answer cue.
  function reorder(task, id, values) {
    for (const area of task.areas) {
      const f = area.fields.find(item => item.id === id);
      if (f && f.options) f.options.sort((a, b) => values.indexOf(a.value) - values.indexOf(b.value));
    }
  }
  reorder(potato, 'measure', ['after', 'beforeafter', 'other']);
  reorder(potato, 'time', ['varies', 'same', 'other']);
  reorder(potato, 'process', ['final', 'percent', 'other']);
  reorder(beetroot, 'measure', ['colour', 'absorbance', 'other']);
  reorder(beetroot, 'process', ['percent', 'mean', 'other']);
  reorder(growth, 'allocation', ['size', 'random', 'other']);
  reorder(growth, 'conditions', ['varies', 'same', 'other']);

  const originalCheck = data.check;
  data.check = function (id, answers) {
    const a = Object.assign({}, answers || {});
    if (id === 'beetroot') delete a.time; // Retain legacy state, but the entered duration now replaces it.
    const messages = originalCheck(id, a);
    const add = (fieldId, type, text) => messages.push({ field: fieldId, type, text });
    if (id === 'beetroot') {
      if (a.diagnosis && a.diagnosis !== 'volume') add('diagnosis', 'problem', 'The 60 °C tubes also have more water. That can affect the solution and its absorbance, so temperature is not the only difference. Reconsider the proposed volumes.');
      if (a.repair === 'divide') add('repair', 'problem', 'Multiplying an absorbance by volume does not establish that volume had no effect on pigment release. Choose a comparison with the same water volume.');
      if (a.duration && Number.isFinite(Number(a.duration)) && Number(a.duration) !== 10) add('duration', 'problem', 'The question specifies a 10-minute treatment. Use 10 minutes for each tube.');
      const nums = ['n0', 'n1', 'n2'].map(key => a[key]);
      if (nums.every(value => /^\d+(?:\.0+)?$/.test(String(value ?? '').trim()))) {
        const n = nums.map(Number);
        if (a.repair === 'two' && (n[0] < 1 || n[1] < 1 || n[2] !== 0)) add('repair', 'problem', 'This repair compares 20 and 40 °C only. Allocate discs to both and enter zero at 60 °C, or select the three-temperature repair.');
        if (a.repair === 'three' && n.some(value => value < 1)) add('repair', 'problem', 'This repair keeps all three temperatures. Allocate discs to each, or choose the two-temperature repair.');
      }
      if (a.repair === 'two' && a.volume && Number.isFinite(Number(a.volume)) && Number(a.volume) !== 10) add('volume', 'problem', 'The selected repair retains 10 cm³ at 20 and 40 °C. Enter 10 cm³, or choose and describe another design.');
    }
    if (id === 'growth') {
      const counts = ['n0', 'n1', 'n2'].map(key => a[key]);
      if (a.unit === 'individual' && counts.every(value => /^\d+(?:\.0+)?$/.test(String(value ?? '').trim())) && /^\d+(?:\.0+)?$/.test(String(a.independent_count ?? '').trim())) {
        const total = counts.reduce((sum, value) => sum + Number(value), 0);
        if (total <= 18 && Number(a.independent_count) !== total) add('independent_count', 'problem', `With one independently treated pot per seedling, your allocation gives ${total} independent treatment applications. Change this count or the allocation so they agree.`);
      }
      if (a.unit === 'other' && a.independent_count !== undefined && String(a.independent_count).trim() !== '') add('independent_count', 'unassessed', 'The number of independent applications depends on how the treatment is applied. Explain the arrangement for review.');
      if (a.endday && Number.isFinite(Number(a.endday)) && Number(a.endday) !== 7) add('endday', 'problem', 'The question asks about seven days. Take the final measurement on day 7.');
      if (a.inference && a.inference !== 'finalonly') add('inference', 'problem', 'The recorded final lengths can be compared, but they do not give each seedling’s increase without its initial length. Random allocation does not make all starts identical.');
    }
    return messages;
  };
}());
