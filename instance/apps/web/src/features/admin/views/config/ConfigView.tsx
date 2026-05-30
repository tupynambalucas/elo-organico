import { type FC } from 'react';
import { AdminContainer } from '../../components';
import { faGear } from '@elo-organico/studio/icons';

const ConfigView: FC = () => {
  return (
    <AdminContainer title="Configurações" icon={faGear}>
      <p>Configurações do sistema em breve.</p>
    </AdminContainer>
  );
};

export default ConfigView;
