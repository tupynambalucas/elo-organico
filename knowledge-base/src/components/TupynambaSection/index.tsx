import React from 'react';
import Translate from '@docusaurus/Translate';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';

export default function TupynambaSection() {
  const logoPath = useBaseUrl('/tupynamba/svg/logo.svg');

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.logoWrapper}>
          <img src={logoPath} alt="Tupynambá Logo" className={styles.mainLogo} />
        </div>

        <div className={styles.content}>
          <div className={styles.badge}>
            <Translate id="homepage.about.badge">The Architect</Translate>
          </div>
          
          <h2>
            <Translate id="homepage.about.title">Tupynambá Lucas</Translate>
          </h2>

          <p className={styles.bio}>
            <Translate id="homepage.about.description">
              Principal Software Architect and Fullstack Engineer with over a decade of experience in building high-fidelity digital infrastructure. I specialize in the design and implementation of context-driven monorepos and distributed systems, leveraging cutting-edge technologies like Fastify v5, React 19, and WebGPU. My approach integrates Domain-Driven Design (DDD) with AI-native workflows (MCP) and transactional ACID reliability (MongoDB Replica Sets) to deliver scalable, secure, and future-proof enterprise solutions.
            </Translate>
          </p>

          <div className={styles.techGrid}>
            <div className={styles.techItem}>
              <span className={styles.techLabel}>
                <Translate id="homepage.about.tech.architecture">Architecture</Translate>
              </span>
              <span className={styles.techValue}>Distributed Systems, DDD, Monorepos</span>
            </div>
            <div className={styles.techItem}>
              <span className={styles.techLabel}>
                <Translate id="homepage.about.tech.engineering">Engineering</Translate>
              </span>
              <span className={styles.techValue}>Fastify v5, React 19, WebGPU</span>
            </div>
            <div className={styles.techItem}>
              <span className={styles.techLabel}>
                <Translate id="homepage.about.tech.reliability">Reliability</Translate>
              </span>
              <span className={styles.techValue}>ACID Transactions, MCP, CI/CD</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
