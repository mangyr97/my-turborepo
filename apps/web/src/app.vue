<script setup lang="ts">
import { Page } from "ui";
import { name } from "../package.json";
import {
  GetCatsDto,
} from 'contract';

const res = await fetch('/api/cats')
const cats = res.body as GetCatsDto
</script>

<template>
  <Page :app-name="cats" />
</template>
