/**
 * The selected machine's model and laser tube, as the GFUI keeps them on the
 * machine. Models are pro, plus, basic, hd_pro, hd_plus, gfd_pro and
 * gfd_basic, and tube types pro, basic, hd_pro, hd_plus, diode_pro and
 * diode_basic. Material settings are chosen by tube type.
 */
export interface MachineModel {
  model: string;
  tubeType: string;
}

const IDENTIFIER = /^[a-z0-9_-]{1,32}$/;

const MODEL_NAMES: { [model: string]: string } = {
  pro: 'Pro',
  plus: 'Plus',
  basic: 'Basic',
  hd_pro: 'HD Pro',
  hd_plus: 'HD Plus',
  gfd_pro: 'Diode Pro',
  gfd_basic: 'Diode Basic',
};

/**
 * Checks a model and tube type reported by a Glowforge page. A machine
 * without a tube type has a basic one, as the GFUI assumes.
 */
export function parseMachineModel(value: unknown): MachineModel | null {
  if (typeof value !== 'object' || value === null) return null;
  const { model, tubeType } = value as { [key: string]: unknown };
  if (typeof model !== 'string' || !IDENTIFIER.test(model)) return null;
  if (tubeType == null) return { model, tubeType: 'basic' };
  if (typeof tubeType !== 'string' || !IDENTIFIER.test(tubeType)) return null;
  return { model, tubeType };
}

/**
 * Whether the machine is a Pro: a Pro, HD Pro or diode Pro.
 */
export function isProMachine(machine: MachineModel): boolean {
  return /(^|_)pro$/.test(machine.model);
}

/**
 * The model's name, like "Pro" or "HD Plus", or its id for a model this
 * version doesn't know.
 */
export function machineModelName(machine: MachineModel): string {
  return MODEL_NAMES[machine.model] ?? machine.model;
}
