import { Meter } from "../../app/models/meter";
interface Props {
  meter: Meter;
}

export default function MeterCard({ meter }: Props) {

  return (
    <div className="em-card">
      <div className="em-card-header">Meter Info</div>
      <div className="em-card-field">
        <b>Name</b>: {meter.name}
      </div>
      <div className="em-card-field">
        <b>Serial Number</b>: {meter.serial_number}
      </div>
      <div className="em-card-field">
        <b>Installation Date</b>: {new Date(meter.installation_date).toLocaleDateString()}
      </div>
      <div className="em-card-field">
        <b>Created At</b>: {new Date(meter.created_at).toLocaleDateString()}
      </div>
      <div className="em-card-field">
        <b>Updated At</b>: {new Date(meter.updated_at).toLocaleDateString()}
      </div>
    </div>
  );
}
