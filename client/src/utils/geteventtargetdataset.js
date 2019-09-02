export default function getEventTargetDataset(event) {
  return event.target.dataset.id ? // sometimes the child element receives the event
    event.target.dataset
    : event.target.parentNode.dataset;
};