enum StateStatus { initial, loading, success, failure }

extension StateStatusX on StateStatus {
  String toJsonString() {
    return toString().split('.').last;
  }

  static StateStatus fromJsonString(String status) {
    switch (status) {
      case 'initial':
        return StateStatus.initial;
      case 'loading':
        return StateStatus.loading;
      case 'success':
        return StateStatus.success;
      case 'failure':
        return StateStatus.failure;
      default:
        return StateStatus.initial; // Default value if status is unknown
    }
  }
}