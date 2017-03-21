declare namespace keypress {
  class Listener {
    public should_suppress_event_defaults: boolean;
    public should_force_event_defaults: boolean;
    public sequence_delay: number;

    public register_many(combos: any): void;
  }
}
