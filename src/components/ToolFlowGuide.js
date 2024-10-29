import { CheckCircle } from 'lucide-react';
import '../componentStyles/ToolFlowGuide.css';

const ToolFlowGuide = () => {
  return (
    <div className="tool-container">
      <h2 className="tool-header">Simple Steps to Get Started</h2>

      <div>
        {/* Step 1 */}
        <div className="step-container">
          <CheckCircle className="step-icon" />
          <div>
            <h3 className="step-title">Step 1: My Company Details</h3>
            <p className="step-description">Click "My Company Details" to enter your company information.</p>
          </div>
        </div>

        {/* Step 2 */}
        <div className="step-container">
          <CheckCircle className="step-icon" />
          <div>
            <h3 className="step-title">Step 2: Create Client Details</h3>
            <p className="step-description">After creating company details, click "Create Client Details" to add and save client information.</p>
          </div>
        </div>

        {/* Step 3 */}
        <div className="step-container">
          <CheckCircle className="step-icon" />
          <div>
            <h3 className="step-title">Step 3: Generate Invoice</h3>
            <p className="step-description">Finally, click "Invoice" to generate an invoice based on the saved client details and company Details.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToolFlowGuide;
