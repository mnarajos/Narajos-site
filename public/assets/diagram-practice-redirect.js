const destinations = {
 filtration:"/ks3/lesson/?topic=separating-techniques#activity-filtration",
 circuits:"/ks3/lesson/?topic=electricity#activity-circuits",
 syringe:"/ks3/particles/#activity-syringe",
 refraction:"/ks3/lesson/?topic=light-and-sound#activity-refraction",
 "iv-circuit":"/gcse/?activity=iv-circuit#topic-p2",
 electrolysis:"/gcse/?activity=electrolysis#topic-c4",
 leaf:"/gcse/?activity=leaf#topic-b2",
 distillation:"/gcse/?activity=distillation#topic-c1",
 inheritance:"/gcse/?activity=inheritance#topic-b6",
 phloem:"/alevel/#catchup-a3-phloem",
 nephron:"/alevel/#catchup-a6-kidney",
 sarcomere:"/alevel/#catchup-a6-sliding",
 synapse:"/alevel/#catchup-a6-synapse",
 breathing:"/human-biology/#catchup/f170/2.2.2",
 airway:"/human-biology/#catchup/f170/1.2.2",
 thermoregulation:"/human-biology/#catchup/f170/3.1.1",
 cycle:"/human-biology/#catchup/f170/3.3.2",
 cuff:"/human-biology/#catchup/f171/4.2.2",
 cast:"/human-biology/#catchup/f171/2.1",
 antibody:"/human-biology/#catchup/f171/a3",
 screening:"/human-biology/#catchup/f171/4.2.1",
 insulation:"/teaching/focused-writing/gcse/compare-insulation/#activity-insulation",
 quadrats:"/teaching/focused-writing/gcse/meadow-biodiversity/#activity-quadrats",
 trolley:"/teaching/focused-writing/gcse/trolley-acceleration/#activity-trolley"
};
const target = destinations[location.hash.slice(1)];
if (typeof target === "string") location.replace(target);
