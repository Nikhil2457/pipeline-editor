// src/components/ValidationMessage.js
import './ValidationMessage.css';

function ValidationMessage({ status }) {
  return (
    <div className={`validation-message ${status.isValid ? 'valid' : 'invalid'}`}>
      {status.message}
    </div>
  );
}

export default ValidationMessage;