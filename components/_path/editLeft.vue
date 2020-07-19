/**
*
*  @author ZTiger
*
*/


<template>
  <div class="edit-left-wrap side-nov">
    <div class="header index-page-flex-middle">
      <div class="header-left">目录</div>
      <div class="header-right">
        <Dropdown>
          <Icon type="md-add" size="16" class="header-right-icon" />
          <DropdownMenu slot="list">
            <DropdownItem class="index-page-flex-middle header-list">
              <img src="@/assets/images/folder.svg" class="header-list-svg" />
              <span>文件夹</span>
            </DropdownItem>
            <DropdownItem class="index-page-flex-middle header-list">
              <img src="@/assets/images/notepad.svg" class="header-list-svg" />
              <span>记事本</span>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <Icon type="md-more" size="16" class="header-right-icon" />
      </div>
    </div>
    <div class="main scroll-hover"></div>
  </div>
</template>


<script>
export default {
  data() {
    return {};
  },
};
</script>


<style scoped>
.side-nov {
  width: 20%;
  max-width: 300px;
}
.edit-left-wrap {
  display: flex;
  flex-direction: column;
  border-right: 1px solid #ddd;
}
.header {
  height: 41px;
  padding: 6px 6px 6px 24px;
  justify-content: space-between;
  border-bottom: 1px solid #ddd;
}
.main {
  flex: auto;
  height: 0;
  padding: 6px;
  overflow: auto;
}
.header-right-icon {
  width: 28px;
  height: 28px;
  line-height: 28px;
  border-radius: 4px;
  transition: all 0.2s linear 0s;
  margin: 0 0 0 4px;
  cursor: pointer;
}
.header-right-icon:hover {
  background: #dcdee2;
}
.header-list {
  color: #000;
}
.header-list-svg {
  margin: 0 7px 0 0;
  width: 18px;
  height: 18px;
}
</style>
