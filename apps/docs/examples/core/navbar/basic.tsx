"use client";

import { Alignment, Button, InputGroup, Navbar, NavbarDivider, NavbarGroup, NavbarHeading } from "@clawscale/react";

export default function NavbarBasic() {
  return (
    <Navbar>
      <NavbarGroup>
        <NavbarHeading>Lakehouse</NavbarHeading>
        <NavbarDivider />
        <Button variant="minimal" icon="home" text="Home" />
        <Button variant="minimal" icon="flows" text="Pipelines" />
        <Button variant="minimal" icon="database" text="Datasets" />
      </NavbarGroup>
      <NavbarGroup align={Alignment.END}>
        <InputGroup aria-label="Search datasets" leftIcon="search" placeholder="Search datasets" type="search" />
        <NavbarDivider />
        <Button variant="minimal" icon="notifications" aria-label="Notifications" />
        <Button variant="minimal" icon="cog" aria-label="Settings" />
      </NavbarGroup>
    </Navbar>
  );
}
