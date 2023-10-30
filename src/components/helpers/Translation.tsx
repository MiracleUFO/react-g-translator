/* eslint-disable react/jsx-no-useless-fragment */
import React from 'react';
import determineRenderedText from '../../utils/determineRenderedText';
import useTranslation from '../../queries/useTranslation';

import { DEFAULT_PROPS } from '../../constants';
import language from '../../types/language';

const Translation = ({
  text,
  from,
  to,
  shouldFallback,
}: {
  text: string;
  from?: language;
  to?: language;
  shouldFallback?: boolean;
}) => {
  const {
    data,
    isError,
    isLoading,
  } = useTranslation(text, from, to);

  const translatedText = determineRenderedText(
    text,
    data,
    shouldFallback,
    isError,
    isLoading,
  );
  return <>{translatedText}</>;
};

Translation.defaultProps = DEFAULT_PROPS;

export default Translation;
