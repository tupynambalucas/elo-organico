import React from 'react';
import Layout from '@theme/Layout';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import BrandIdentity from './components/BrandIdentity';
import PenpotAide from './components/PenpotAide';
import CreativeHub from './components/CreativeHub';
import styles from './styles.module.css';

export default function StudioPage() {
  return (
    <Layout
      title="Studio Workspace"
      description="Canonical hub for brand strategy, multi-tool creative assets, and self-hosted design infrastructure with Aide AI."
    >
      <main className={styles.container}>
        <h1>Studio Workspace</h1>

        <p>
          The Studio workspace serves as the multi-disciplinary creative and structural nucleus of
          the Elo Orgânico ecosystem. It functions as the master repository for brand strategy,
          high-fidelity design sources across professional suites, and a technical orchestration
          layer for our self-hosted design environment integrated with the Aide AI assistant.
        </p>

        <Tabs>
          <TabItem value="identity" label="Brand Identity" default>
            <BrandIdentity />
          </TabItem>

          <TabItem value="penpot" label="Penpot & Aide">
            <PenpotAide />
          </TabItem>

          <TabItem value="creative-hub" label="Studio & Creative Assets">
            <CreativeHub />
          </TabItem>
        </Tabs>
      </main>
    </Layout>
  );
}
