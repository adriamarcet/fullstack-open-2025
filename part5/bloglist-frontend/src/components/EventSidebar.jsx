const EventSidebar = ({ eventLogs, clearEventsLog }) => (
  <aside className="event-sidebar">
    <h2>Event log</h2>
    {eventLogs.length === 0 ? (
      <p>No events yet.</p>
    ) : (
      <ul className="event-list">
        {eventLogs.map((entry, index) => (
          <li key={`${entry.timestamp}-${index}`} className="event-entry">
            <div className={entry.type === 'error' ? 'event-message event-error' : 'event-message'}>
              [{entry.type}] {entry.message}
            </div>
            <div className="event-timestamp">{entry.timestamp}</div>
          </li>
        ))}
      </ul>
    )}
    <button className="button" onClick={clearEventsLog}>Clear events</button>
  </aside>
)

export default EventSidebar
