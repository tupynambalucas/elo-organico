import React from 'react';
import Layout from '@theme/Layout';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import McpEcosystem from './components/McpEcosystem';
import NetworkArchitecture from './components/NetworkArchitecture';
import EngineeringGuidelines from './components/EngineeringGuidelines';
import MaintenanceLogic from './components/MaintenanceLogic';
import styles from './styles.module.css';

export default function ToolsIndex() {
  return (
    <Layout
      title="Tools Workspace"
      description="Technical automation infrastructure, Model Context Protocol (MCP) ecosystems, and AI-native engineering guidelines."
    >
      <main className={styles.container}>
        <h1>Tools Workspace</h1>

        <p>
          The Tools workspace provides the automation backbone for the Elo Orgânico project. It
          centralizes specialized Model Context Protocol (MCP) servers and infrastructure scripts
          designed to enhance developer productivity, ensure environment parity through multi-stage
          Docker builds, and enable secure, high-context AI-native engineering workflows.
        </p>

        <Tabs>
          <TabItem value="mcp" label="MCP Ecosystem" default>
            <McpEcosystem />
          </TabItem>

          <TabItem value="network" label="AI Security & Network">
            <NetworkArchitecture />
          </TabItem>

          <TabItem value="guidelines" label="Engineering Guidelines">
            <EngineeringGuidelines />
          </TabItem>

          <TabItem value="scripts" label="Maintenance & Logic">
            <MaintenanceLogic />
          </TabItem>
        </Tabs>
      </main>
    </Layout>
  );
}
