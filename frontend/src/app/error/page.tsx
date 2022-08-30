enum ErrorCode {
  USER_DENIED_PERMISSION = 'USER_DENIED_PERMISSION',
  UNKNOWN = 'UNKNOWN',
  AUTHENTICATION_FAILED = 'AUTHENTICATION_FAILED',
}

function getErrorCode(errorCode: string | null) {
  switch (errorCode) {
    case ErrorCode.AUTHENTICATION_FAILED:
      return {
        code: ErrorCode.AUTHENTICATION_FAILED,
        description: 'Authentication failed',
      } as const;
    case ErrorCode.USER_DENIED_PERMISSION:
      return {
        code: ErrorCode.USER_DENIED_PERMISSION,
        description: 'User denied permission',
      } as const;
    default:
      return {
        code: ErrorCode.UNKNOWN,
        description: 'An unknown error has occurred',
      } as const;
  }
}

export default function Error({ searchParams }: any) {
  const errorCode = getErrorCode(searchParams.get('code'));
  return (
    <div>
      <h1>{errorCode.code}</h1>
      <p>{errorCode.description}</p>
    </div>
  );
}
