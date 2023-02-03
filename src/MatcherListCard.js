import React from 'react'
import MatcherCard from './MatcherCard';

// TODO: call items users

export default function MatcherListCard({items}) {
  return (
    <>
      {items.map(u => (
        <MatcherCard
          key={u.username}
          id={u.id}
          name={u.first_name}
          img={u.image}
          bio={u.bio}
          distance={99999999}
        />
      ))}
    </>
  );
}
