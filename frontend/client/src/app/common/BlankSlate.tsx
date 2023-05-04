import { Header, Icon } from "semantic-ui-react";

export default function BlankSlate() {
  return (
    <div className="em-blank-slate">
      <div className="em-blank-slate-item">
        <Icon name="question circle" size="huge" color="grey" />
      </div>
      <div className="em-blank-slate-item">
        <Header color="grey">No records found. Start creating...</Header>
      </div>
    </div>
  );
}
