import { Customer } from "../../app/models/customer";
interface Props {
  customer: Customer;
}

export default function CustomerCard({ customer }: Props) {

  return (
    <div className="em-card">
      <div className="em-card-header">Customer Info</div>
      <div className="em-card-field">
        <b>Name</b>: {customer.name}
      </div>
      <div className="em-card-field">
        <b>Email</b>: {customer.email}
      </div>
      <div className="em-card-field">
        <b>Vat Number</b>: {customer.vat_number}
      </div>
      <div className="em-card-field">
        <b>Created At</b>: {new Date(customer.created_at).toLocaleDateString()}
      </div>
      <div className="em-card-field">
        <b>Updated At</b>: {new Date(customer.updated_at).toLocaleDateString()}
      </div>
    </div>
  );
}
