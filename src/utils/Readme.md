## throwError(statusCode, message)
throwError 함수는 두 개의 인자를 받습니다.
statusCode는 세 자리의 정수로, HTTP RESPONSE에 사용되는 status code를 상황에 맞게 입력합니다.
message는 string으로, 대문자의 snake case를 기본으로 합니다.

## checkEmptyValues(...args)
checkEmptyValues는 n개의 인자를 받습니다.
주어진 인자들 중 하나라도 falsy 값이 있으면 throwError(400, "KEY_ERROR")를 일으킵니다.