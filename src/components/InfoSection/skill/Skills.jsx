import React from "react";
import "./TechnicalSkills.css"; 

export default function TechnicalSkills() {
  return (
    <section className="tech">
      <div className="tech-container">
        <div className="tech-title">
          <h3 className="underline-title">Technical Skills</h3>
        </div>

        <div className="ts-card-wrapper">
          {/* Row 1 */}
          <div className="ts-row">
            <div className="ts-card ts-top-card">Front-End Development</div>
            <div className="ts-card ts-glass-card">HTML & CSS</div>
            <div className="ts-card ts-glass-card">
              VMware-based cloud environment simulation
            </div>
          </div>

          {/* Row 2 */}
          <div className="ts-row">
            <div className="ts-card ts-glass-card">JavaScript & Frameworks</div>
            <div className="ts-card ts-middle-card">
              Cloud Computing & Data Analysis
            </div>
            <div className="ts-card ts-glass-card">Experience using AI tools</div>
          </div>

          {/* Row 3 */}
          <div className="ts-row">
            <div className="ts-card ts-glass-card">
              Hadoop ecosystem (HDFS, YARN, MapReduce)
            </div>
            <div className="ts-card ts-glass-card">Business & Management</div>
            <div className="ts-card ts-bottom-card">IBM</div>
          </div>
        </div>
      </div>
    </section>
  );
}