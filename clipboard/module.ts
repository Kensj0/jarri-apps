import type {
  PanelDefinition,
  WorkspaceModuleDefinition,
} from "../../core/types";
import { staticSemantic } from "../../core/panelSemantics";
import { ClipboardPanel } from "./panels/ClipboardPanel";

const panel: PanelDefinition = {
  moduleId: "clipboard",
  panelType: "clipboard",
  title: "Urklipp",
  description: "Vad som ligger i urklippet just nu, och när det ändrades.",
  category: "domain",

  defaultGeometry: {
    x: 260,
    y: 200,
    width: 320,
    height: 180,
  },

  minGeometry: {
    width: 240,
    height: 140,
  },

  stateVersion: 1,

  capabilities: {
    closable: true,
    resizable: true,
    movable: true,
    renameable: false,
    canBeDirty: false,
  },

  createInitialState: () => ({}),

  normalizeState: () => ({
    state: {},
    repaired: false,
    warnings: [],
  }),

  semanticStrategy: staticSemantic(() => ({
    kind: "clipboard",
    summary: "The clipboard summary from the zorin-clipboard-pling service.",
    sections: [],
  })),

  Component: ClipboardPanel,
};

export const clipboardModule: WorkspaceModuleDefinition = {
  moduleId: "clipboard",
  title: "Urklipp",
  version: "0.1.0",
  panels: [panel],
};
