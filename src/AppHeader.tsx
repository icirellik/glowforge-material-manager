import React from 'react';
import { SyncStatus } from './SyncStatus';
import logo from './logo.svg';
import type { Connection, ForceSyncronize, Reconnect } from './App';
import { isProMachine, machineModelName } from './lib/machineModel';
import type { MachineModel } from './lib/machineModel';
import './AppHeader.css';

interface AppHeaderProps {
  cloudItemsUsed: number;
  cloudStorageBytesUsed: number;
  connection: Connection;
  forceSyncronize: ForceSyncronize;
  machineModel: MachineModel | null;
  reconnect: Reconnect;
  serial: string | null;
  synchronized: boolean;
}

export function AppHeader(props: AppHeaderProps) {
  const {
    cloudItemsUsed,
    cloudStorageBytesUsed,
    connection,
    forceSyncronize,
    machineModel,
    reconnect,
    serial,
    synchronized,
  } = props;
  return (
    <header className="header">
      <div className="header__headline">
        <img src={logo} className="header__logo" alt="logo" />
        <h1 className="header__title">
          Glowforge Material Manager
          {serial ? ` - ${serial}` : undefined}
        </h1>
        {machineModel ? (
          <MachineModelBadge machineModel={machineModel} selected={!!serial} />
        ) : null}
        <SyncStatus
          connection={connection}
          forceSync={forceSyncronize}
          reconnect={reconnect}
          synchronized={synchronized}
        />
      </div>
      <div className="header_subline">
        {`Cloud Storage Used ${cloudStorageBytesUsed} / 102,400 bytes, ${cloudItemsUsed} / 512 materials`}
      </div>
    </header>
  );
}

/**
 * The machine's model, filled in for a Pro. Speeds are shown in this
 * machine's ranges, so it's shown on other tabs too, as the last machine
 * selected.
 */
function MachineModelBadge(props: {
  machineModel: MachineModel;
  selected: boolean;
}) {
  const { machineModel, selected } = props;
  const name = machineModelName(machineModel);
  const pro = isProMachine(machineModel);
  return (
    <span
      className={`header__model${pro ? ' header__model--pro' : ''}`}
      title={`${selected ? 'The selected machine' : 'The last machine selected'} is a Glowforge ${name}, tube type ${machineModel.tubeType}.`}
    >
      {name}
    </span>
  );
}
