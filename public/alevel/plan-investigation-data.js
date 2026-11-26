/* Authored investigation briefs and deterministic checks. Open responses are not marked. */
(function () {
  'use strict';
  const options = entries => entries.map(([value, label]) => ({ value, label }));
  const select = (id, label, entries) => ({ id, label, type: 'select', options: options(entries) });
  const number = (id, label, max) => ({ id, label, type: 'number', min: 0, max, step: 1 });
  const text = (id, label) => ({ id, label, type: 'text' });
  const help = (prompt, cue, example) => [prompt, cue, example];
  const allocation = (levels, max) => levels.map((level, i) => number(`n${i}`, `Number of specimens at ${level}`, max));
  const independent = () => select('unit', 'How are the specimens treated?', [
    ['individual', 'Each specimen has its own independently treated vessel'],
    ['shared', 'All specimens at each chosen treatment share one treatment vessel'],
    ['readings', 'Take repeated readings from one specimen and count them as independent specimens'],
    ['other', 'Another arrangement']
  ]);
  const investigations = [
    {
      id: 'potato', title: 'Potato and sucrose',
      question: 'How does sucrose concentration affect the percentage change in mass of potato pieces after 30 minutes?',
      brief: 'Water can move into or out of potato tissue by osmosis. You have 12 comparable potato pieces, 12 labelled 50 cm³ vessels, prepared 0, 0.2, 0.4 and 0.6 mol dm⁻³ sucrose solutions, a balance, a measuring cylinder that measures to the nearest 0.5 cm³, a timer and paper towel. Each piece starts with a measurable, non-zero mass. A pilot found that 10–30 cm³ of solution fully covers each piece in a vessel. For this task, use at least two separately treated pieces at each concentration you choose so you can observe variation.',
      model: 'One possible start is to put three similar pieces in three separate vessels of 0 mol dm⁻³ solution. Keeping the pieces comparable and treating them separately helps you compare treatments and observe variation between separately treated pieces. You still need to plan the other concentrations and the measurements.',
      calculation: 'Percentage change = (final mass − initial mass) ÷ initial mass × 100. For a piece changing from 2.0 g to 2.2 g: (2.2 − 2.0) ÷ 2.0 × 100 = +10%. Calculate this for each piece before finding a treatment mean.',
      help: help('Start with the question: what changes and what will you compare?', 'Use separate pieces at more than one concentration. Measure the same pieces before and after the same exposure time.', 'For example, use three separately treated pieces at each concentration, measure mass in grams before and after 30 minutes, and compare the mean individual percentage changes.'),
      areas: [
        { title: 'Comparison', fields: [...allocation(['0 mol dm⁻³', '0.2 mol dm⁻³', '0.4 mol dm⁻³', '0.6 mol dm⁻³'], 12), independent()] },
        { title: 'Measurement', fields: [
          select('measure', 'Which measurements will you take?', [['beforeafter','Mass of each piece in grams before and after treatment'],['after','Final mass only'],['other','Another measurement']]),
          select('time', 'When will you measure the final mass?', [['same','After 30 minutes for every concentration'],['varies','After a different time at each concentration'],['other','Another timing']]),
          select('process', 'How will you process the measurements?', [['percent','Calculate percentage change for each piece, then the mean for each concentration'],['final','Compare the mean final masses only'],['other','Another approach']])
        ] },
        { title: 'Samples and conditions', fields: [
          { ...number('volume', 'Volume of solution per vessel / cm³', 30), min: 10, step: 0.5 },
          select('conditions', 'How will you make the comparison fair?', [['same','Use comparable pieces and the same solution volume, temperature and blotting method'],['varies','Use a different solution volume for each concentration'],['other','Another approach']]),
          text('reason', 'Why is it useful to use comparable pieces at each concentration?')
        ] }
      ]
    },
    {
      id: 'beetroot', title: 'Beetroot and temperature',
      question: 'How does temperature during a 10-minute treatment affect pigment released from beetroot tissue?',
      brief: 'You have 12 similar beetroot discs, 12 individual 50 cm³ tubes, water baths at 20, 40 and 60 °C, water, a measuring cylinder that measures to the nearest 0.5 cm³, forceps, timer, colorimeter and matching cuvettes. Pigment can leak into the water. Set the colorimeter to zero using clear water; a higher absorbance reading means more pigment in the solution. Use the same cuvette orientation and colorimeter setting for each reading. A pilot found that 10–30 cm³ of water fully covers each disc in a tube. Let the water reach the bath temperature before adding the discs; after exposure, remove each disc with forceps and allow the solutions to reach the same room temperature before measuring. For this task, use at least two separately treated discs at each temperature you choose so you can observe variation.',
      model: '',
      help: help('Think about what has to be the same in each tube so temperature is the main difference.', 'Rinse similarly sized discs to remove pigment released by cutting; allow the water to reach the treatment temperature before adding discs and compare separately treated tubes after the same time.', 'For example, use four discs in separate tubes at each temperature, equal volumes pre-equilibrated to each temperature and 10 minutes each. Measure each solution’s absorbance using the same instrument setting, then compare the treatment means.'),
      areas: [
        { title: 'Comparison', fields: [...allocation(['20 °C', '40 °C', '60 °C'], 12), independent()] },
        { title: 'Measurement', fields: [
          select('measure', 'How will you measure the outcome?', [['absorbance','Measure absorbance of each solution with the colorimeter'],['colour','Describe solution colour by eye only'],['other','Another measurement']]),
          select('time', 'How will exposure time relate to temperature?', [['same','The same 10-minute exposure at each temperature'],['varies','A different exposure time at each temperature'],['other','Another timing']]),
          select('process', 'How will you compare the readings?', [['mean','Compare mean absorbance for the separately treated tubes at each temperature'],['percent','Calculate percentage mass change'],['other','Another approach']])
        ] },
        { title: 'Samples and conditions', fields: [
          { ...number('volume', 'Volume of water per tube / cm³', 30), min: 10, step: 0.5 },
          select('conditions', 'How will you prepare and treat the samples?', [['same','Use similar-sized discs, rinse consistently and use equal solution volumes'],['varies','Use a different solution volume for each temperature'],['other','Another approach']]),
          text('procedure', 'Describe how you will prepare the discs and carry out the treatment.'),
          text('reason', 'Why should exposure time be the same at each temperature?')
        ] }
      ]
    },
    {
      id: 'growth', title: 'Growth regulator and seedlings',
      question: 'Does the concentration of a supplied growth regulator affect the increase in stem length of young seedlings over seven days?',
      brief: 'The regulator can affect elongation and is taken up through the roots after it is added to the compost. You can use 18 individually potted seedlings that begin at different lengths, or a preselected set of 18 whose initial stem lengths are each known to be exactly 40 mm. You have prepared 0, 1 and 5 mg dm⁻³ regulator solutions with the same solvent, water, a measuring cylinder, a ruler, labels and a controlled growing space. A pilot found that a single 5 cm³ dose of solution per pot on day 0, followed by 10 cm³ water per pot daily, keeps the compost moist over seven days. For this task, use at least two separately treated seedlings at each concentration you choose so you can observe variation.',
      model: '',
      help: help('Plan a comparison that can separate treatment from initial differences and other growing conditions.', 'Allocate the finite pots across treatments, include the 0 mg dm⁻³ reference, and connect what you measure to what you calculate.', 'One approach is to randomly allocate six pots to each treatment, measure each stem at the start and after seven days, calculate each increase and compare treatment means.'),
      areas: [
        { title: 'Comparison', fields: [...allocation(['0 mg dm⁻³', '1 mg dm⁻³', '5 mg dm⁻³'], 18), independent(),
          select('allocation', 'How will you allocate the seedlings?', [['random','Randomly allocate seedlings to treatments'],['size','Put the largest seedlings in the highest concentration'],['other','Another allocation']])
        ] },
        { title: 'Measurement', fields: [
          select('measure', 'What will you record?', [['beforeafter','Initial and day-seven stem length of each seedling in mm'],['finalknown','Day-seven lengths in mm after selecting seedlings whose initial lengths are each known to be 40 mm'],['finalstandard','Day-seven length after standardising initial lengths, without saying what the initial lengths were'],['final','Day-seven stem length only for randomly allocated seedlings that start at different lengths'],['other','Another measurement']]),
          select('process', 'How will you process the measurements?', [['change','Calculate each increase (or percentage increase), then compare treatment means'],['final','Compare mean final lengths'],['other','Another approach']])
        ] },
        { title: 'Samples and conditions', fields: [
          select('conditions', 'How will you manage the growing conditions?', [['same','Use the supplied dosing and watering schedule for all pots; keep light, temperature and growing period the same'],['varies','Put all high-concentration plants in brighter light'],['other','Another approach']]),
          text('reason', 'Explain how your allocation or measurement helps you account for initial variation.')
        ] }
      ]
    },
    {
      id: 'cress', title: 'Cress and salt',
      question: 'A grower wants to know whether salt in watering solution affects cress seed germination after five days. A seed counts as germinated when its root is visible. Plan an investigation and explain how you would compare the results.',
      brief: 'You have 24 seeds from one packet, 24 individually labelled pots containing identical compost, prepared 0, 0.1 and 0.2 mol dm⁻³ sodium chloride solutions, a measuring cylinder and a covered, ventilated growing area. A pilot found that 10 cm³ solution per pot keeps this compost moist for five days. Light and temperature can be kept constant.',
      model: '',
      help: help('Consider the comparison, observations and conditions in your first plan.', 'A reference without salt helps interpret a comparison. Think about independently treated pots and a common observation time.', 'One approach is to allocate eight separately treated pots to each concentration, keep light uniform or balance treatments across positions, count germination after five days and compare proportions.'),
      areas: [
        { title: 'Follow-up: allocation', fields: [...allocation(['0 mol dm⁻³', '0.1 mol dm⁻³', '0.2 mol dm⁻³'], 24), independent()] },
        { title: 'Follow-up: conditions', fields: [select('conditions', 'How will you deal with light and position?', [['same','Keep light uniform or balance treatments across positions'],['varies','Put all salt-treated pots in brighter light than the reference'],['other','Another approach']])] },
        { title: 'Follow-up: observations', fields: [select('measure', 'What will you record and compare?', [['proportion','Count germinated seeds on day five and compare proportions per treatment'],['length','Count germinated seeds on day five and compare mean root lengths'],['other','Another approach']])] }
      ]
    }
  ];

  investigations.forEach(task => {
    task.areas[task.areas.length - 1].fields.push({ id: 'details', label: 'Describe another approach (if selected)', type: 'textarea', optional: true });
  });

  function check(id, answers) {
    const task = investigations.find(item => item.id === id);
    if (!task) return [];
    const a = answers || {};
    const issues = [];
    const add = (field, type, text) => issues.push({ field, type, text });
    const fields = task.areas.flatMap(area => area.fields);
    fields.forEach(field => {
      const value = a[field.id];
      if (value === undefined || value === null || String(value).trim() === '') {
        if (!field.optional) add(field.id, 'missing', 'Add this decision to your plan.');
      } else if (field.type === 'number') {
        const raw = String(value).trim();
        const n = Number(raw);
        const validNumber = /^\d+(?:\.\d+)?$/.test(raw) && Number.isFinite(n);
        if (field.step === 0.5) {
          if (!validNumber || n < field.min || n > field.max || !Number.isInteger(n * 2)) {
            add(field.id, 'problem', `Enter a volume from ${field.min} to ${field.max} cm³ in 0.5 cm³ steps.`);
          }
        } else if (!validNumber || !Number.isInteger(n) || n < field.min || n > field.max) {
          add(field.id, 'problem', `Enter a whole number from ${field.min} to ${field.max}.`);
        }
      } else if (field.type === 'select' && !field.options.some(option => option.value === value)) {
        add(field.id, 'problem', 'Choose one of the available responses.');
      } else if (field.type === 'select' && value === 'other') {
        add(field.id, 'unassessed', 'This checker cannot assess that approach. Explain it in your plan and compare it with the brief.');
      } else if (field.type === 'text' || field.type === 'textarea') {
        add(field.id, 'unassessed', 'Your written response is saved for you to review; the checker does not assess it.');
      }
    });
    const needsDetails = fields.some(field => field.type === 'select' && a[field.id] === 'other') || (id === 'beetroot' && a.measure === 'colour');
    if (needsDetails && !String(a.details || '').trim()) add('details', 'missing', 'Describe the alternative approach so you can review it against the brief. This writing will not be automatically assessed.');
    const counts = fields.filter(field => /^n\d+$/.test(field.id));
    const validCounts = counts.every(field => /^\d+(?:\.0+)?$/.test(String(a[field.id] ?? '').trim()) && Number(a[field.id]) >= field.min && Number(a[field.id]) <= field.max);
    if (validCounts) {
      const nums = counts.map(field => Number(a[field.id]));
      const max = counts[0].max;
      if (nums.reduce((sum, n) => sum + n, 0) > max) add(counts[0].id, 'problem', `That allocation needs ${nums.reduce((sum, n) => sum + n, 0)} specimens, but you have ${max}. Change the numbers so the total fits.`);
      if (id !== 'cress' && nums.some(n => n === 1)) add(counts[nums.indexOf(1)].id, 'problem', 'For this task, use at least two separately treated specimens at each chosen level so you can observe variation. Change the allocation.');
      if (nums.filter(n => n > 0).length < 2) add(counts[0].id, 'problem', 'Include specimens at two or more different treatment levels so you can compare them.');
      if (id === 'cress' && nums[0] === 0) add('n0', 'problem', 'Include the zero-concentration reference as well as a treatment, so you can compare the effect of adding salt.');
      if (id === 'growth' && nums[0] === 0 && nums.filter(n => n > 0).length >= 2) add('n0', 'advisory', 'Two non-zero concentrations can be compared. Include a zero-concentration reference if you also want to compare growth with no added regulator.');
      if (id === 'cress' && nums.some(n => n === 1)) add(counts[nums.indexOf(1)].id, 'advisory', 'One pot at a level cannot show variation between pots there. Consider assigning more independently treated pots to that level.');
      if (id === 'cress' && nums.filter(n => n > 0).length >= 2 && new Set(nums.filter(n => n > 0)).size > 1) add('n0', 'alternative', 'Unequal group sizes can work. Compare proportions rather than raw counts.');
    }
    if (a.unit === 'readings') add('unit', 'problem', 'Repeated readings of one specimen do not create independent specimens. Change the design to treat separate specimens independently.');
    if (a.unit === 'shared' && validCounts) {
      const nums = counts.map(field => Number(a[field.id]));
      if (nums.some(n => n > 1)) {
        add('unit', 'problem', 'Several specimens share one treatment vessel at a chosen level, so they are not independent applications of that treatment. Choose an independent vessel for each specimen, or choose another arrangement and describe it for review.');
      } else if (nums.some(n => n === 1)) {
        add('unit', 'advisory', 'With one specimen at each chosen level, one vessel per level is also one vessel per specimen. One treatment unit at a level cannot show variation between independent applications.');
      }
    }
    if (a.conditions === 'varies') add('conditions', 'problem', id === 'cress' ? 'Light changes with salt treatment, so a difference could be due to light as well. Change the positions or conditions so the treatments can be compared.' : 'Another influential condition changes with the treatment, so it could also explain a difference. Change the conditions so the treatments can be compared.');
    if (a.time === 'varies') add('time', 'problem', 'Exposure time changes with the treatment, so a difference could be due to time as well. Change the timings so the treatments can be compared.');
    if (id === 'potato') {
      if (a.measure === 'after') add('measure', 'problem', 'Final mass alone does not give the change for each piece. Add a measurement before treatment.');
      if (a.process === 'final') add('process', 'problem', 'The question asks for percentage change, not final mass. Calculate the change for each piece and compare the means.');
    }
    if (id === 'beetroot') {
      if (a.measure === 'colour') add('measure', 'unassessed', 'A visual comparison is a possible approach, but this checker cannot assess its detail. Explain how you would make the comparison consistent.');
      if (a.measure === 'colour' && a.process === 'mean') add('process', 'problem', 'A colour description does not give absorbance readings to average. Change the measurements or explain another way to compare them.');
      if (a.process === 'percent' && a.measure === 'absorbance') add('process', 'problem', 'You collect absorbance readings, not mass measurements. Change the processing to compare absorbance.');
      if (a.process === 'percent' && a.measure === 'colour') add('process', 'problem', 'Your colour descriptions do not provide mass measurements. Change the processing or the measurements.');
      if (a.process === 'percent' && a.measure === 'other') add('process', 'unassessed', 'The checker cannot tell whether your other measurement supports this calculation. Explain how your measurement and processing answer the question.');
    }
    if (id === 'growth') {
      if (a.allocation === 'size') add('allocation', 'problem', 'Starting size changes with treatment, so it could also explain a difference. Change the allocation so starting size is not tied to concentration.');
      if (a.measure === 'final' && a.process === 'change') add('process', 'problem', 'The initial length of each seedling is not known in this plan, so its individual increase cannot be calculated. Record initial lengths, or use the supplied set with a known common initial length.');
      if (a.measure === 'finalstandard') add('measure', 'unassessed', 'The starting information is not specified. If each initial length is known, it can support individual increases; explain your method for review.');
      if (a.measure === 'final' && a.process === 'final' && a.allocation === 'random') add('measure', 'alternative', 'Random allocation supports a comparison of final lengths, although starting differences can remain by chance. A difference in final outcomes can estimate a treatment contrast; it does not calculate each seedling’s increase.');
      if (a.measure === 'beforeafter' && a.process === 'final' && a.allocation === 'random') add('process', 'alternative', 'A randomised comparison of final lengths can estimate a treatment contrast, though initial differences may remain by chance. Comparing final outcomes is not the same as calculating each seedling’s increase.');
    }
    if (id === 'cress' && a.measure === 'length') add('measure', 'problem', 'Root length describes root growth; it does not by itself answer the question about germination. Count the seeds that have germinated after five days and compare germination counts or proportions.');
    return issues;
  }
  window.ALevelPlanInvestigationData = { investigations, check };
}());
