import { FC, useState } from 'react';
import styles from './submit-card-description.module.scss';
import CardProps from '@/model/components/SubmitCardDescription/SubmitCardDescription';
import Password from '../Password/Password';

const SubmitCardDescription: FC<CardProps> = ({
  title,
  description,
  image,
  LastClassName,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      className={`${styles['submit-card-description']} ${
        LastClassName ? styles[LastClassName] : ''
      }`}
    >
      <div
        className={`${styles['submit-card-description__header']}  ${
          isExpanded ? styles['expanded'] : ''
        }`}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h4 className={styles['submit-card-description__header_title']}>
          {title}
        </h4>
        <span
          className={styles['submit-card-description__header_arrow']}
        ></span>
      </div>
      {isExpanded && (
        <div className={styles['submit-card-description__content']}>
          <div
            className={styles['submit-card-description__content_wrapper-img']}
          >
            {image && (
              <img
                src={image}
                alt={`image ${description.values.name}`}
                style={{ width: '3vw' }}
              />
            )}
          </div>
          <h5 className={styles['submit-card-description__content_title']}>
            Name: {description.values.name}
          </h5>
          <h5 className={styles['submit-card-description__content_item']}>
            Age: {description.values.age}
          </h5>
          <h5 className={styles['submit-card-description__content_item']}>
            Email: {description.values.email}
          </h5>
          <div
            className={`${styles['submit-card-description__content_item']} ${styles['password']}`}
          >
            <h5>Password:</h5>
            <Password value={description.values.passwordOne} />
          </div>
          <h5 className={styles['submit-card-description__content_item']}>
            Gender: {description.values.gender}
          </h5>
          <h5 className={styles['submit-card-description__content_item']}>
            Country: {description.values.selectedCountry}
          </h5>
        </div>
      )}
    </div>
  );
};

export default SubmitCardDescription;
