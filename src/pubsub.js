const topics = {};

const subscribe = (topic, listener) => {
  topics[topic] = [...(topics[topic] || []), listener];
  const index = topics[topic].length - 1;
  return {
    remove: () => delete topics[topic][index],
  };
};

const publish = (topic, info) => {
  if (!topics[topic]) {
    return;
  }

  topics[topic].forEach((item) => {
    item(info || {});
  });
};

export { subscribe, publish };
