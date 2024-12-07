import { BarretenbergBackend, BarretenbergVerifier as Verifier, type CompiledCircuit } from '@noir-lang/backend_barretenberg';
import { Noir } from '@noir-lang/noir_js';
import circuit from 'circuit/target/circuit.json';

export const noirBackend = new BarretenbergBackend(circuit as CompiledCircuit);
export const noirInstance = new Noir(circuit as CompiledCircuit);
