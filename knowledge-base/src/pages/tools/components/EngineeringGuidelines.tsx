import React from 'react';

export default function EngineeringGuidelines() {
  return (
    <div>
      <h3>Rules of Engagement for AI Agents</h3>
      <p>The workspace defines strict behavioral logic for AI agents through structured context files. These guidelines ensure that all automated changes follow project-wide architectural standards and maintain technical integrity.</p>

      <h4>Operational Conventions</h4>
      <ul>
        <li><strong>Domain Core First:</strong> Modification of shared schemas or data models must originate in the <code>core</code> packages (Single Source of Truth) before being propagated to application layers.</li>
        <li><strong>Strict Typing & Linting:</strong> Agents are strictly prohibited from using <code>any</code> or bypassing the project's rigorous TypeScript/ESLint configurations. Validation via <code>typecheck</code> is a mandatory step after code modification.</li>
        <li><strong>Technological Minimalism:</strong> Avoid suggesting external dependencies unless no native or already-implemented solution exists within the current stack (Fastify, React, Zustand, Zod).</li>
        <li><strong>Conventional Documentation:</strong> Documentation updates must follow a professional, senior tone, utilizing MDX features like Tabs for high-density information management.</li>
      </ul>
    </div>
  );
}
