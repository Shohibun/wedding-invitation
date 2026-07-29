import { NotificationError } from "../errors";

export class PreferenceError extends NotificationError {
  constructor(message: string) {
    super(message, "PREFERENCE_ERROR");
  }
}

export class SearchError extends NotificationError {
  constructor(message: string) {
    super(message, "SEARCH_ERROR");
  }
}

export class FilterError extends NotificationError {
  constructor(message: string) {
    super(message, "FILTER_ERROR");
  }
}

export class NotificationCenterError extends NotificationError {
  constructor(message: string) {
    super(message, "CENTER_ERROR");
  }
}

export class ArchiveError extends NotificationError {
  constructor(message: string) {
    super(message, "ARCHIVE_ERROR");
  }
}

export class RetryError extends NotificationError {
  constructor(message: string) {
    super(message, "RETRY_ERROR");
  }
}
