# StockInfo

Проект, позволяющий просматривать актуальные котировки ценных бумаг, а так же покупать/продавать их с помощью виртуального счета.

[Ссылка на сайт]() (Актуальная ссылка всегда находится в описании проекта).

## Основные функции
- **Изменение темы**: Поддержка нескольких тем интерфейса.
- **Умная встроенная клавиатура**: Проверка и предотвращение ввода некорректных символов.
- **Возможность ввода с помощью системной клавиатуры**: Поддержка ввода данных с системной клавиатуры.
- **Поддержка сложных выражений**: Обработка и вычисление сложных математических выражений.
- **Умное преобразование выражений**: Автоматическое преобразование выражений в корректный формат. Например, 5(2+3)+√25-√(13+23)(10/5) автоматически преобразовывается в 5*(2+3)+(25)**(1/2)-((13+23)**(1/2))*(10/5).
- **Локальное сохранение истории**: Сохранение истории вычислений в локальном хранилище.
- **Продуманные анимации**: Визуальные анимации для улучшения восприятия и взаимодействия.
- **Звуки взаимодействия**: Аудио-эффекты при взаимодействии с калькулятором.
- **Настройка громкости звуков**: Возможность настройки уровня громкости звуковых эффектов.
- **Доступность**: Поддержка экранных ридеров и управления с клавиатуры.
- **Поддержка PWA**: Полная поддержка Progressive Web App (PWA).

## Зависимости
- Typescript (5.5.4): типизированный расширенный набор JavaScript, который компилируется в простой JavaScript.
- React (18.3.1): JavaScript-библиотека с открытым исходным кодом для разработки пользовательских интерфейсов.
- Framer Motion (11.3.8): библиотека для создания продвинутых react анимаций.
- Sonner (1.5.0): это компонент всплывающих уведомлений для React, разработанный Emil Kowalski.
- И более мелкие вспомогательные библиотеки.

## Локальный запуск
1. ***Сначала необходимо создать проект на Supabase.***

   Для этого необходимо перейти на одноименный сайт (ссылка в списке api), зарегистрироваться и настроить проект.

   После создаем базу данных. Она должна содержать 2 таблицы. Их наименования:
     - Transactions
     - UserMainData
     
     Структуру можно посмотреть по пути [`/src/types/supabase.types.ts`](src/types/supabase.types.ts) в типе `Database` в поле `public/Tables`.
   Далее добавляем в проект на сайте Enums.
   Их можно посмотреть по пути [`/src/types/supabase.types.ts`](src/types/supabase.types.ts) в типе `Database` в поле `public/Enums`.

   В конце создаем/заменяем строку для генерации типов в `package.json -> scripts` на собственную.
   ```
    "generate:types": "npx supabase gen types typescript --project-id НАЗВАНИЕ_ПРОЕКТА --schema public > ./src/types/supabase.types.ts"
    ```
   Подробнее можно узнать в документации supabase.
> [!WARNING]
> При изменении структуры базы данных необходимо заново сгенерировать типы. 
>
> Для лучше типизации после генерации рекомендуется заменить значения в полях 
> "favorites" - TFavoritesList[] | null, "purchases" - TPurchasesList[] | null и "created_at" на Date

2. ***Клонируем репозиторий и создаем файл .env в корне проекта. В нем должно быть 4 поля:***
    ```
    NEXT_PUBLIC_SUPABASE_URL=
    NEXT_PUBLIC_SUPABASE_ANON_KEY=
    SUPABASE_SERVICE_KEY=
    
    NEXT_PUBLIC_SITEURL=http://localhost:3000 (или ваш url)
    ```
    Все поля можно найти в панели управлением проектом *Supabase* в разделе *settings -> API*.
    Первые два поля базовые и необходимы для работы проекта, третье для полного доступа ко всему проекту с обходом политики RLS и **не должен попасть на клиент**. 
    Он необходим, чтобы полностью переложить на серверную часть next js ответственность за работу с базой данных и админ. функциями supabase auth (такими как удаление пользователя).

3. ***Далее идет установка всех зависимостей проекта.***
```
.\
npm install
# or
yarn install
# or
pnpm install
```
4. ***После установки зависимостей можно запускать проект.***
```
npm run dev
# or
yarn dev
# or
pnpm dev
```

5. ***Если запуск произошел успешно, то перейдите по адресу http://localhost:3000 в браузере.***
