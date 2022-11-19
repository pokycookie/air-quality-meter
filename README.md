# PKNU 공기질 측정기

### https://pknu-air-pokycookie.koyeb.app/

## 배포

### [Koyeb](https://www.koyeb.com/)

Koyeb를 이용하여 Node.js 웹서버를 배포하였습니다.

## Arduino

### [Arduino & NodeMCU](https://github.com/pokycookie/2022-Capstone-Arduino)

Arduino와 NodeMCU의 코드는 위의 레포지토리를 확인해주세요.

## API - Get data

`[GET] /api/data[?query]`

### Query

ex) `/api/data?f_temp=$lte37.52$gte23.5&f_humi=$gt0.34&s_temp=asc&s_humi=desc&limit=24`

#### filter parameter

특정 필드에 필터를 적용하기 위해서는 해당 필드명 앞에 `f_`를 붙여 사용

- `f_temp` : 온도 필드 필터
- `f_humi` : 습도 필드 필터
- `f_pm10` : pm1.0 미세먼지 필드 필터
- `f_pm25` : pm2.5 미세먼지 필드 필터
- `f_pm100` : pm10 미세먼지 필드 필터
- `f_form` : 포름알데하이드 필드 필터
- `updated` : 생성 날짜 필드 필터

###### ※ updated 필드의 값은 ISO형식의 문자열([ISO 8601](https://en.wikipedia.org/wiki/ISO_8601))을 사용

ex) `/api/data?f_updated=$gte2022-11-02T15:00:00.000Z$lt2022-11-10T15:00:00.000Z`

#### filter value

해당 필드에 적용할 필터 값을 아래의 operator를 이용해 설정

- `$lt<value>` : value보다 작은 값
- `$lte<value>` : value보다 작거나 같은 값
- `$gt<value>` : value보다 큰 값
- `$gte<value>` : value보다 크거나 같은 값
- `$eq<value>` : value와 같은 값
- `$ne<value>` : value가 아닌 값

###### ※ 서로 다른 operator를 동시에 사용하여 and 필터링 가능

#### sort parameter

특정 필드에 정렬을 적용하기 위해서는 해당 필드명 앞에 `s_`를 붙여 사용

- `s_temp` : 온도 필드 정렬
- `s_humi` : 습도 필드 정렬
- `s_pm10` : pm1.0 미세먼지 필드 정렬
- `s_pm25` : pm2.5 미세먼지 필드 정렬
- `s_pm100` : pm10 미세먼지 필드 정렬
- `s_form` : 포름알데하이드 필드 정렬
- `s_updated` : 생성 날짜 필드 정렬

#### sort value

- `asc` : 오름차순 정렬
- `desc` : 내림차순 정렬

#### limit

`limit=<value>`의 형식을 이용해 가져올 데이터의 개수를 제한

ex) `/api/data?limit=10`
