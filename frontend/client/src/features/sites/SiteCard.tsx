import { Site } from "../../app/models/site";
interface Props {
  site: Site;
}

export default function SiteCard({ site }: Props) {

  return (
    <div className="em-card">
      <div className="em-card-header">Site Info</div>
      <div className="em-card-field">
        <b>Name</b>: {site.name}
      </div>
      <div className="em-card-field">
        <b>Longitude</b>: {site.longitude}
      </div>
      <div className="em-card-field">
        <b>Latitude</b>: {site.latitude}
      </div>
      <div className="em-card-field">
        <b>Address</b>: {site.address}
      </div>
      <div className="em-card-field">
        <b>Post Code</b>: {site.post_code}
      </div>
      <div className="em-card-field">
        <b>Created At</b>: {new Date(site.created_at).toLocaleDateString()}
      </div>
      <div className="em-card-field">
        <b>Updated At</b>: {new Date(site.updated_at).toLocaleDateString()}
      </div>
    </div>
  );
}
