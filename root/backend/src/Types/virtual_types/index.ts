interface VirtualType {
  type: any
  required: boolean
}

export const StringRequired: VirtualType = { type: String, required: true };
export const BooleanRequired: VirtualType = { type: Boolean, required: true };
export const NumberRequired: VirtualType = { type: Number, required: true };
