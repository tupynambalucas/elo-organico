import type { ReactNode } from 'react';
import Translate, { translate } from '@docusaurus/Translate';
import styles from './styles.module.css';
import Link from '@docusaurus/Link';
import BrowserOnly from '@docusaurus/BrowserOnly';

export default function WhySection(): ReactNode {
  return (
    <section className={styles.section}>
      <div className={styles.content}>
        <h1><Translate id="homepage.why.title">Why Elo Orgânico?</Translate></h1>
        <div>
          <div>
            <h2><Translate id="homepage.why.item1.title">Belonging</Translate></h2>
            <p><Translate id="homepage.why.item1.description">Be part of a network that values the local producer.</Translate></p>
          </div>
          <div>
            <h2><Translate id="homepage.why.item2.title">Simplicity</Translate></h2>
            <p><Translate id="homepage.why.item2.description">Direct and transparent processes for everyone.</Translate></p>
          </div>
          <div>
            <h2><Translate id="homepage.why.item3.title">Human Connection</Translate></h2>
            <p><Translate id="homepage.why.item3.description">Relationships based on trust and respect.</Translate></p>
          </div>
        </div>
      </div>
    </section>
  );
}
