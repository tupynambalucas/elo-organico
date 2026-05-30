import { type FC } from 'react';
import { AdminContainer } from '../../components';
import { faChartSimple } from '@elo-organico/studio/icons';

const ReportsView: FC = () => {
  return (
    <AdminContainer title="Relatórios" icon={faChartSimple}>
      <p>Módulo de relatórios em breve.</p>
    </AdminContainer>
  );
};

export default ReportsView;
